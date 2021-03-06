(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define('angular2-qrscanner', ['exports', '@angular/core', 'rxjs', '@angular/common'], factory) :
	(factory((global['angular2-qrscanner'] = {}),global.ng.core,global.rxjs,global.ng.common));
}(this, (function (exports,core,rxjs,common) { 'use strict';

var AlignmentPattern = /** @class */ (function () {
    function AlignmentPattern(posX, posY, estimatedModuleSize) {
        this.count = 1;
        this.incrementCount = function () {
            this.count++;
        };
        this.aboutEquals = function (moduleSize, i, j) {
            if (Math.abs(i - this.y) <= moduleSize && Math.abs(j - this.x) <= moduleSize) {
                var moduleSizeDiff = Math.abs(moduleSize - this.estimatedModuleSize);
                return moduleSizeDiff <= 1.0 || moduleSizeDiff / this.estimatedModuleSize <= 1.0;
            }
            return false;
        };
        this.x = posX;
        this.y = posY;
        this.estimatedModuleSize = estimatedModuleSize;
    }
    Object.defineProperty(AlignmentPattern.prototype, "EstimatedModuleSize", {
        get: function () {
            return this.estimatedModuleSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AlignmentPattern.prototype, "Count", {
        get: function () {
            return this.count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AlignmentPattern.prototype, "X", {
        get: function () {
            return Math.floor(this.x);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AlignmentPattern.prototype, "Y", {
        get: function () {
            return Math.floor(this.y);
        },
        enumerable: true,
        configurable: true
    });
    return AlignmentPattern;
}());
var AlignmentPatternFinder = /** @class */ (function () {
    function AlignmentPatternFinder(image, startX, startY, width, height, moduleSize, imageWidth, imageHeight, resultPointCallback) {
        this.possibleCenters = new Array();
        this.crossCheckStateCount = new Array(0, 0, 0);
        this.centerFromEnd = function (stateCount, end) {
            return (end - stateCount[2]) - stateCount[1] / 2.0;
        };
        this.foundPatternCross = function (stateCount) {
            var moduleSize = this.moduleSize;
            var maxVariance = moduleSize / 2.0;
            for (var i = 0; i < 3; i++) {
                if (Math.abs(moduleSize - stateCount[i]) >= maxVariance) {
                    return false;
                }
            }
            return true;
        };
        this.crossCheckVertical = function (startI, centerJ, maxCount, originalStateCountTotal) {
            var image = this.image;
            var maxI = this.imageHeight;
            var stateCount = this.crossCheckStateCount;
            stateCount[0] = 0;
            stateCount[1] = 0;
            stateCount[2] = 0;
            var i = startI;
            while (i >= 0 && image[centerJ + i * this.imageWidth] && stateCount[1] <= maxCount) {
                stateCount[1]++;
                i--;
            }
            if (i < 0 || stateCount[1] > maxCount) {
                return NaN;
            }
            while (i >= 0 && !image[centerJ + i * this.imageWidth] && stateCount[0] <= maxCount) {
                stateCount[0]++;
                i--;
            }
            if (stateCount[0] > maxCount) {
                return NaN;
            }
            i = startI + 1;
            while (i < maxI && image[centerJ + i * this.imageWidth] && stateCount[1] <= maxCount) {
                stateCount[1]++;
                i++;
            }
            if (i == maxI || stateCount[1] > maxCount) {
                return NaN;
            }
            while (i < maxI && !image[centerJ + i * this.imageWidth] && stateCount[2] <= maxCount) {
                stateCount[2]++;
                i++;
            }
            if (stateCount[2] > maxCount) {
                return NaN;
            }
            var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2];
            if (5 * Math.abs(stateCountTotal - originalStateCountTotal) >= 2 * originalStateCountTotal) {
                return NaN;
            }
            return this.foundPatternCross(stateCount) ? this.centerFromEnd(stateCount, i) : NaN;
        };
        this.handlePossibleCenter = function (stateCount, i, j) {
            var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2];
            var centerJ = this.centerFromEnd(stateCount, j);
            var centerI = this.crossCheckVertical(i, Math.floor(centerJ), 2 * stateCount[1], stateCountTotal);
            if (!isNaN(centerI)) {
                var estimatedModuleSize = (stateCount[0] + stateCount[1] + stateCount[2]) / 3.0;
                var max = this.possibleCenters.length;
                for (var index = 0; index < max; index++) {
                    var center = this.possibleCenters[index];
                    if (center.aboutEquals(estimatedModuleSize, centerI, centerJ)) {
                        return new AlignmentPattern(centerJ, centerI, estimatedModuleSize);
                    }
                }
                var point = new AlignmentPattern(centerJ, centerI, estimatedModuleSize);
                this.possibleCenters.push(point);
                if (this.resultPointCallback != null) {
                    this.resultPointCallback.foundPossibleResultPoint(point);
                }
            }
            return null;
        };
        this.find = function () {
            var startX = this.startX;
            var height = this.height;
            var maxJ = startX + this.width;
            var middleI = this.startY + (height >> 1);
            var stateCount = new Array(0, 0, 0);
            for (var iGen = 0; iGen < height; iGen++) {
                var i = middleI + ((iGen & 0x01) == 0 ? ((iGen + 1) >> 1) : -((iGen + 1) >> 1));
                stateCount[0] = 0;
                stateCount[1] = 0;
                stateCount[2] = 0;
                var j = startX;
                while (j < maxJ && !this.image[j + this.imageWidth * i]) {
                    j++;
                }
                var currentState = 0;
                while (j < maxJ) {
                    if (this.image[j + i * this.imageWidth]) {
                        if (currentState == 1) {
                            stateCount[currentState]++;
                        }
                        else {
                            if (currentState == 2) {
                                if (this.foundPatternCross(stateCount)) {
                                    var confirmed = this.handlePossibleCenter(stateCount, i, j);
                                    if (confirmed != null) {
                                        return confirmed;
                                    }
                                }
                                stateCount[0] = stateCount[2];
                                stateCount[1] = 1;
                                stateCount[2] = 0;
                                currentState = 1;
                            }
                            else {
                                stateCount[++currentState]++;
                            }
                        }
                    }
                    else {
                        if (currentState == 1) {
                            currentState++;
                        }
                        stateCount[currentState]++;
                    }
                    j++;
                }
                if (this.foundPatternCross(stateCount)) {
                    var confirmed = this.handlePossibleCenter(stateCount, i, maxJ);
                    if (confirmed != null) {
                        return confirmed;
                    }
                }
            }
            if (!(this.possibleCenters.length == 0)) {
                return this.possibleCenters[0];
            }
            throw "Couldn't find enough alignment patterns";
        };
        this.image = image;
        this.startX = startX;
        this.startY = startY;
        this.width = width;
        this.height = height;
        this.moduleSize = moduleSize;
        this.resultPointCallback = resultPointCallback;
        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;
    }
    return AlignmentPatternFinder;
}());
var PerspectiveTransform = /** @class */ (function () {
    function PerspectiveTransform(a11, a21, a31, a12, a22, a32, a13, a23, a33) {
        this.transformPoints1 = function (points) {
            var max = points.length;
            var a11 = this.a11;
            var a12 = this.a12;
            var a13 = this.a13;
            var a21 = this.a21;
            var a22 = this.a22;
            var a23 = this.a23;
            var a31 = this.a31;
            var a32 = this.a32;
            var a33 = this.a33;
            for (var i = 0; i < max; i += 2) {
                var x = points[i];
                var y = points[i + 1];
                var denominator = a13 * x + a23 * y + a33;
                points[i] = (a11 * x + a21 * y + a31) / denominator;
                points[i + 1] = (a12 * x + a22 * y + a32) / denominator;
            }
        };
        this.transformPoints2 = function (xValues, yValues) {
            var n = xValues.length;
            for (var i = 0; i < n; i++) {
                var x = xValues[i];
                var y = yValues[i];
                var denominator = this.a13 * x + this.a23 * y + this.a33;
                xValues[i] = (this.a11 * x + this.a21 * y + this.a31) / denominator;
                yValues[i] = (this.a12 * x + this.a22 * y + this.a32) / denominator;
            }
        };
        this.buildAdjoint = function () {
            return new PerspectiveTransform(this.a22 * this.a33 - this.a23 * this.a32, this.a23 * this.a31 - this.a21 * this.a33, this.a21 * this.a32 - this.a22 * this.a31, this.a13 * this.a32 - this.a12 * this.a33, this.a11 * this.a33 - this.a13 * this.a31, this.a12 * this.a31 - this.a11 * this.a32, this.a12 * this.a23 - this.a13 * this.a22, this.a13 * this.a21 - this.a11 * this.a23, this.a11 * this.a22 - this.a12 * this.a21);
        };
        this.times = function (other) {
            return new PerspectiveTransform(this.a11 * other.a11 + this.a21 * other.a12 + this.a31 * other.a13, this.a11 * other.a21 + this.a21 * other.a22 + this.a31 * other.a23, this.a11 * other.a31 + this.a21 * other.a32 + this.a31 * other.a33, this.a12 * other.a11 + this.a22 * other.a12 + this.a32 * other.a13, this.a12 * other.a21 + this.a22 * other.a22 + this.a32 * other.a23, this.a12 * other.a31 + this.a22 * other.a32 + this.a32 * other.a33, this.a13 * other.a11 + this.a23 * other.a12 + this.a33 * other.a13, this.a13 * other.a21 + this.a23 * other.a22 + this.a33 * other.a23, this.a13 * other.a31 + this.a23 * other.a32 + this.a33 * other.a33);
        };
        this.a11 = a11;
        this.a12 = a12;
        this.a13 = a13;
        this.a21 = a21;
        this.a22 = a22;
        this.a23 = a23;
        this.a31 = a31;
        this.a32 = a32;
        this.a33 = a33;
    }
    PerspectiveTransform.quadrilateralToQuadrilateral = function (x0, y0, x1, y1, x2, y2, x3, y3, x0p, y0p, x1p, y1p, x2p, y2p, x3p, y3p) {
        var qToS = this.quadrilateralToSquare(x0, y0, x1, y1, x2, y2, x3, y3);
        var sToQ = this.squareToQuadrilateral(x0p, y0p, x1p, y1p, x2p, y2p, x3p, y3p);
        return sToQ.times(qToS);
    };
    PerspectiveTransform.squareToQuadrilateral = function (x0, y0, x1, y1, x2, y2, x3, y3) {
        var dy2 = y3 - y2;
        var dy3 = y0 - y1 + y2 - y3;
        if (dy2 == 0.0 && dy3 == 0.0) {
            return new PerspectiveTransform(x1 - x0, x2 - x1, x0, y1 - y0, y2 - y1, y0, 0.0, 0.0, 1.0);
        }
        else {
            var dx1 = x1 - x2;
            var dx2 = x3 - x2;
            var dx3 = x0 - x1 + x2 - x3;
            var dy1 = y1 - y2;
            var denominator = dx1 * dy2 - dx2 * dy1;
            var a13 = (dx3 * dy2 - dx2 * dy3) / denominator;
            var a23 = (dx1 * dy3 - dx3 * dy1) / denominator;
            return new PerspectiveTransform(x1 - x0 + a13 * x1, x3 - x0 + a23 * x3, x0, y1 - y0 + a13 * y1, y3 - y0 + a23 * y3, y0, a13, a23, 1.0);
        }
    };
    PerspectiveTransform.quadrilateralToSquare = function (x0, y0, x1, y1, x2, y2, x3, y3) {
        var t = this.squareToQuadrilateral(x0, y0, x1, y1, x2, y2, x3, y3);
        return t.buildAdjoint();
    };
    return PerspectiveTransform;
}());
var BitMatrix = /** @class */ (function () {
    function BitMatrix(width, height) {
        if (!height)
            height = width;
        if (width < 1 || height < 1) {
            throw "Both dimensions must be greater than 0";
        }
        this.width = width;
        this.height = height;
        this.rowSize = width >> 5;
        if ((width & 0x1f) != 0) {
            this.rowSize++;
        }
        this.bits = new Array(this.rowSize * height);
        for (var i = 0; i < this.bits.length; i++)
            this.bits[i] = 0;
    }
    Object.defineProperty(BitMatrix.prototype, "Width", {
        get: function () {
            return this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BitMatrix.prototype, "Height", {
        get: function () {
            return this.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BitMatrix.prototype, "Dimension", {
        get: function () {
            if (this.width != this.height) {
                throw "Can't call getDimension() on a non-square matrix";
            }
            return this.width;
        },
        enumerable: true,
        configurable: true
    });
    BitMatrix.prototype.URShift = function (number, bits) {
        if (number >= 0)
            return number >> bits;
        else
            return (number >> bits) + (2 << ~bits);
    };
    BitMatrix.prototype.get_Renamed = function (x, y) {
        var offset = y * this.rowSize + (x >> 5);
        return ((this.URShift(this.bits[offset], (x & 0x1f))) & 1) != 0;
    };
    BitMatrix.prototype.set_Renamed = function (x, y) {
        var offset = y * this.rowSize + (x >> 5);
        this.bits[offset] |= 1 << (x & 0x1f);
    };
    BitMatrix.prototype.flip = function (x, y) {
        var offset = y * this.rowSize + (x >> 5);
        this.bits[offset] ^= 1 << (x & 0x1f);
    };
    BitMatrix.prototype.clear = function () {
        var max = this.bits.length;
        for (var i = 0; i < max; i++) {
            this.bits[i] = 0;
        }
    };
    BitMatrix.prototype.setRegion = function (left, top, width, height) {
        if (top < 0 || left < 0) {
            throw "Left and top must be nonnegative";
        }
        if (height < 1 || width < 1) {
            throw "Height and width must be at least 1";
        }
        var right = left + width;
        var bottom = top + height;
        if (bottom > this.height || right > this.width) {
            throw "The region must fit inside the matrix";
        }
        for (var y = top; y < bottom; y++) {
            var offset = y * this.rowSize;
            for (var x = left; x < right; x++) {
                this.bits[offset + (x >> 5)] |= 1 << (x & 0x1f);
            }
        }
    };
    return BitMatrix;
}());
var GridSampler = /** @class */ (function () {
    function GridSampler(width, height) {
        this.width = width;
        this.height = height;
    }
    GridSampler.prototype.checkAndNudgePoints = function (image, points) {
        var width = this.width;
        var height = this.height;
        var nudged = true;
        for (var offset = 0; offset < points.length && nudged; offset += 2) {
            var x = Math.floor(points[offset]);
            var y = Math.floor(points[offset + 1]);
            if (x < -1 || x > width || y < -1 || y > height) {
                throw "Error.checkAndNudgePoints ";
            }
            nudged = false;
            if (x == -1) {
                points[offset] = 0.0;
                nudged = true;
            }
            else if (x == width) {
                points[offset] = width - 1;
                nudged = true;
            }
            if (y == -1) {
                points[offset + 1] = 0.0;
                nudged = true;
            }
            else if (y == height) {
                points[offset + 1] = height - 1;
                nudged = true;
            }
        }
        nudged = true;
        for (var offset = points.length - 2; offset >= 0 && nudged; offset -= 2) {
            var x = Math.floor(points[offset]);
            var y = Math.floor(points[offset + 1]);
            if (x < -1 || x > width || y < -1 || y > height) {
                throw "Error.checkAndNudgePoints ";
            }
            nudged = false;
            if (x == -1) {
                points[offset] = 0.0;
                nudged = true;
            }
            else if (x == width) {
                points[offset] = width - 1;
                nudged = true;
            }
            if (y == -1) {
                points[offset + 1] = 0.0;
                nudged = true;
            }
            else if (y == height) {
                points[offset + 1] = height - 1;
                nudged = true;
            }
        }
    };
    GridSampler.prototype.sampleGrid3 = function (image, rawImage, dimension, transform) {
        var bits = new BitMatrix(dimension, dimension);
        var points = new Array(dimension << 1);
        for (var y = 0; y < dimension; y++) {
            var max = points.length;
            var iValue = y + 0.5;
            for (var x = 0; x < max; x += 2) {
                points[x] = (x >> 1) + 0.5;
                points[x + 1] = iValue;
            }
            transform.transformPoints1(points);
            this.checkAndNudgePoints(image, points);
            try {
                for (var x = 0; x < max; x += 2) {
                    var xpoint = (Math.floor(points[x]) * 4) + (Math.floor(points[x + 1]) * this.width * 4);
                    var bit = image[Math.floor(points[x]) + this.width * Math.floor(points[x + 1])];
                    rawImage.data[xpoint] = bit ? 255 : 0;
                    rawImage.data[xpoint + 1] = bit ? 255 : 0;
                    rawImage.data[xpoint + 2] = 0;
                    rawImage.data[xpoint + 3] = 255;
                    if (bit)
                        bits.set_Renamed(x >> 1, y);
                }
            }
            catch (aioobe) {
                throw "Error.checkAndNudgePoints";
            }
        }
        return bits;
    };
    GridSampler.prototype.sampleGridx = function (image, dimension, p1ToX, p1ToY, p2ToX, p2ToY, p3ToX, p3ToY, p4ToX, p4ToY, p1FromX, p1FromY, p2FromX, p2FromY, p3FromX, p3FromY, p4FromX, p4FromY) {
        var transform = PerspectiveTransform.quadrilateralToQuadrilateral(p1ToX, p1ToY, p2ToX, p2ToY, p3ToX, p3ToY, p4ToX, p4ToY, p1FromX, p1FromY, p2FromX, p2FromY, p3FromX, p3FromY, p4FromX, p4FromY);
        return this.sampleGrid3(image, {}, dimension, transform);
    };
    return GridSampler;
}());
var ErrorCorrectionLevel = /** @class */ (function () {
    function ErrorCorrectionLevel(ordinal, bits, name) {
        this.ordinal_Renamed_Field = ordinal;
        this.bits = bits;
        this.name = name;
    }
    ErrorCorrectionLevel.forBits = function (bits) {
        if (bits < 0 || bits >= this.FOR_BITS.length) {
            throw "ArgumentException";
        }
        return this.FOR_BITS[bits];
    };
    Object.defineProperty(ErrorCorrectionLevel.prototype, "Bits", {
        get: function () {
            return this.bits;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorCorrectionLevel.prototype, "Name", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    ErrorCorrectionLevel.prototype.ordinal = function () {
        return this.ordinal_Renamed_Field;
    };
    return ErrorCorrectionLevel;
}());
ErrorCorrectionLevel.L = new ErrorCorrectionLevel(0, 0x01, "L");
ErrorCorrectionLevel.M = new ErrorCorrectionLevel(1, 0x00, "M");
ErrorCorrectionLevel.Q = new ErrorCorrectionLevel(2, 0x03, "Q");
ErrorCorrectionLevel.H = new ErrorCorrectionLevel(3, 0x02, "H");
ErrorCorrectionLevel.FOR_BITS = new Array(ErrorCorrectionLevel.M, ErrorCorrectionLevel.L, ErrorCorrectionLevel.H, ErrorCorrectionLevel.Q);
var FormatInformation = /** @class */ (function () {
    function FormatInformation(formatInfo) {
        this.Equals = function (o) {
            var other = o;
            return this.errorCorrectionLevel == other.errorCorrectionLevel && this.dataMask == other.dataMask;
        };
        this.errorCorrectionLevel = ErrorCorrectionLevel.forBits((formatInfo >> 3) & 0x03);
        this.dataMask = (formatInfo & 0x07);
    }
    Object.defineProperty(FormatInformation.prototype, "ErrorCorrectionLevel", {
        get: function () {
            return this.errorCorrectionLevel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormatInformation.prototype, "DataMask", {
        get: function () {
            return this.dataMask;
        },
        enumerable: true,
        configurable: true
    });
    FormatInformation.prototype.GetHashCode = function () {
        return (this.errorCorrectionLevel.ordinal() << 3) | this.dataMask;
    };
    FormatInformation.URShift = function (number, bits) {
        if (number >= 0)
            return number >> bits;
        else
            return (number >> bits) + (2 << ~bits);
    };
    FormatInformation.numBitsDiffering = function (a, b) {
        a ^= b;
        return FormatInformation.BITS_SET_IN_HALF_BYTE[a & 0x0F]
            + FormatInformation.BITS_SET_IN_HALF_BYTE[(this.URShift(a, 4) & 0x0F)]
            + FormatInformation.BITS_SET_IN_HALF_BYTE[(this.URShift(a, 8) & 0x0F)]
            + FormatInformation.BITS_SET_IN_HALF_BYTE[(this.URShift(a, 12) & 0x0F)]
            + FormatInformation.BITS_SET_IN_HALF_BYTE[(this.URShift(a, 16) & 0x0F)]
            + FormatInformation.BITS_SET_IN_HALF_BYTE[(this.URShift(a, 20) & 0x0F)]
            + FormatInformation.BITS_SET_IN_HALF_BYTE[(this.URShift(a, 24) & 0x0F)]
            + FormatInformation.BITS_SET_IN_HALF_BYTE[(this.URShift(a, 28) & 0x0F)];
    };
    FormatInformation.decodeFormatInformation = function (maskedFormatInfo) {
        var formatInfo = this.doDecodeFormatInformation(maskedFormatInfo);
        if (formatInfo != null) {
            return formatInfo;
        }
        return this.doDecodeFormatInformation(maskedFormatInfo ^ FormatInformation.FORMAT_INFO_MASK_QR);
    };
    FormatInformation.doDecodeFormatInformation = function (maskedFormatInfo) {
        var bestDifference = 0xffffffff;
        var bestFormatInfo = 0;
        for (var i = 0; i < FormatInformation.FORMAT_INFO_DECODE_LOOKUP.length; i++) {
            var decodeInfo = FormatInformation.FORMAT_INFO_DECODE_LOOKUP[i];
            var targetInfo = decodeInfo[0];
            if (targetInfo == maskedFormatInfo) {
                return new FormatInformation(decodeInfo[1]);
            }
            var bitsDifference = FormatInformation.numBitsDiffering(maskedFormatInfo, targetInfo);
            if (bitsDifference < bestDifference) {
                bestFormatInfo = decodeInfo[1];
                bestDifference = bitsDifference;
            }
        }
        if (bestDifference <= 3) {
            return new FormatInformation(bestFormatInfo);
        }
        return null;
    };
    FormatInformation.forBits = function (bits) {
        {
            if (bits < 0 || bits >= FormatInformation.FOR_BITS.length) {
                throw "ArgumentException";
            }
            return FormatInformation.FOR_BITS[bits];
        }
    };
    return FormatInformation;
}());
FormatInformation.FORMAT_INFO_MASK_QR = 0x5412;
FormatInformation.FORMAT_INFO_DECODE_LOOKUP = new Array(new Array(0x5412, 0x00), new Array(0x5125, 0x01), new Array(0x5E7C, 0x02), new Array(0x5B4B, 0x03), new Array(0x45F9, 0x04), new Array(0x40CE, 0x05), new Array(0x4F97, 0x06), new Array(0x4AA0, 0x07), new Array(0x77C4, 0x08), new Array(0x72F3, 0x09), new Array(0x7DAA, 0x0A), new Array(0x789D, 0x0B), new Array(0x662F, 0x0C), new Array(0x6318, 0x0D), new Array(0x6C41, 0x0E), new Array(0x6976, 0x0F), new Array(0x1689, 0x10), new Array(0x13BE, 0x11), new Array(0x1CE7, 0x12), new Array(0x19D0, 0x13), new Array(0x0762, 0x14), new Array(0x0255, 0x15), new Array(0x0D0C, 0x16), new Array(0x083B, 0x17), new Array(0x355F, 0x18), new Array(0x3068, 0x19), new Array(0x3F31, 0x1A), new Array(0x3A06, 0x1B), new Array(0x24B4, 0x1C), new Array(0x2183, 0x1D), new Array(0x2EDA, 0x1E), new Array(0x2BED, 0x1F));
FormatInformation.BITS_SET_IN_HALF_BYTE = new Array(0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4);
FormatInformation.L = new ErrorCorrectionLevel(0, 0x01, "L");
FormatInformation.M = new ErrorCorrectionLevel(1, 0x00, "M");
FormatInformation.Q = new ErrorCorrectionLevel(2, 0x03, "Q");
FormatInformation.H = new ErrorCorrectionLevel(3, 0x02, "H");
FormatInformation.FOR_BITS = new Array(FormatInformation.M, FormatInformation.L, FormatInformation.H, FormatInformation.Q);
var ECB = /** @class */ (function () {
    function ECB(count, dataCodewords) {
        this.count = count;
        this.dataCodewords = dataCodewords;
    }
    Object.defineProperty(ECB.prototype, "Count", {
        get: function () {
            return this.count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ECB.prototype, "DataCodewords", {
        get: function () {
            return this.dataCodewords;
        },
        enumerable: true,
        configurable: true
    });
    return ECB;
}());
var ECBlocks = /** @class */ (function () {
    function ECBlocks(ecCodewordsPerBlock, ecBlocks1, ecBlocks2) {
        this.getECBlocks = function () {
            return this.ecBlocks;
        };
        this.ecCodewordsPerBlock = ecCodewordsPerBlock;
        if (ecBlocks2)
            this.ecBlocks = new Array(ecBlocks1, ecBlocks2);
        else
            this.ecBlocks = new Array(ecBlocks1);
    }
    Object.defineProperty(ECBlocks.prototype, "ECCodewordsPerBlock", {
        get: function () {
            return this.ecCodewordsPerBlock;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ECBlocks.prototype, "TotalECCodewords", {
        get: function () {
            return this.ecCodewordsPerBlock * this.NumBlocks;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ECBlocks.prototype, "NumBlocks", {
        get: function () {
            var total = 0;
            for (var i = 0; i < this.ecBlocks.length; i++) {
                total += this.ecBlocks[i].length;
            }
            return total;
        },
        enumerable: true,
        configurable: true
    });
    return ECBlocks;
}());
var Version = /** @class */ (function () {
    function Version(versionNumber, alignmentPatternCenters, ecBlocks1, ecBlocks2, ecBlocks3, ecBlocks4) {
        this.buildFunctionPattern = function () {
            var dimension = this.DimensionForVersion;
            var bitMatrix = new BitMatrix(dimension);
            bitMatrix.setRegion(0, 0, 9, 9);
            bitMatrix.setRegion(dimension - 8, 0, 8, 9);
            bitMatrix.setRegion(0, dimension - 8, 9, 8);
            var max = this.alignmentPatternCenters.length;
            for (var x = 0; x < max; x++) {
                var i = this.alignmentPatternCenters[x] - 2;
                for (var y = 0; y < max; y++) {
                    if ((x == 0 && (y == 0 || y == max - 1)) || (x == max - 1 && y == 0)) {
                        continue;
                    }
                    bitMatrix.setRegion(this.alignmentPatternCenters[y] - 2, i, 5, 5);
                }
            }
            bitMatrix.setRegion(6, 9, 1, dimension - 17);
            bitMatrix.setRegion(9, 6, dimension - 17, 1);
            if (this.versionNumber > 6) {
                bitMatrix.setRegion(dimension - 11, 0, 3, 6);
                bitMatrix.setRegion(0, dimension - 11, 6, 3);
            }
            return bitMatrix;
        };
        this.getECBlocksForLevel = function (ecLevel) {
            return this.ecBlocks[ecLevel.ordinal()];
        };
        this.versionNumber = versionNumber;
        this.alignmentPatternCenters = alignmentPatternCenters;
        this.ecBlocks = new Array(ecBlocks1, ecBlocks2, ecBlocks3, ecBlocks4);
        var total = 0;
        var ecCodewords = ecBlocks1.ECCodewordsPerBlock;
        var ecbArray = ecBlocks1.getECBlocks();
        for (var i = 0; i < ecbArray.length; i++) {
            var ecBlock = ecbArray[i];
            total += ecBlock.Count * (ecBlock.DataCodewords + ecCodewords);
        }
        this.totalCodewords = total;
    }
    Object.defineProperty(Version.prototype, "VersionNumber", {
        get: function () {
            return this.versionNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Version.prototype, "AlignmentPatternCenters", {
        get: function () {
            return this.alignmentPatternCenters;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Version.prototype, "TotalCodewords", {
        get: function () {
            return this.totalCodewords;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Version.prototype, "DimensionForVersion", {
        get: function () {
            return 17 + 4 * this.versionNumber;
        },
        enumerable: true,
        configurable: true
    });
    Version.getVersionForNumber = function (versionNumber) {
        if (versionNumber < 1 || versionNumber > 40) {
            throw "ArgumentException";
        }
        return Version.VERSIONS[versionNumber - 1];
    };
    Version.getProvisionalVersionForDimension = function (dimension) {
        if (dimension % 4 != 1) {
            throw "Error getProvisionalVersionForDimension";
        }
        try {
            return Version.getVersionForNumber((dimension - 17) >> 2);
        }
        catch (iae) {
            throw "Error getVersionForNumber";
        }
    };
    Version.decodeVersionInformation = function (versionBits) {
        var bestDifference = 0xffffffff;
        var bestVersion = 0;
        for (var i = 0; i < Version.VERSION_DECODE_INFO.length; i++) {
            var targetVersion = Version.VERSION_DECODE_INFO[i];
            if (targetVersion == versionBits) {
                return this.getVersionForNumber(i + 7);
            }
            var bitsDifference = FormatInformation.numBitsDiffering(versionBits, targetVersion);
            if (bitsDifference < bestDifference) {
                bestVersion = i + 7;
                bestDifference = bitsDifference;
            }
        }
        if (bestDifference <= 3) {
            return this.getVersionForNumber(bestVersion);
        }
        return null;
    };
    Version.buildVersions = function () {
        return new Array(new Version(1, new Array(), new ECBlocks(7, new ECB(1, 19)), new ECBlocks(10, new ECB(1, 16)), new ECBlocks(13, new ECB(1, 13)), new ECBlocks(17, new ECB(1, 9))), new Version(2, new Array(6, 18), new ECBlocks(10, new ECB(1, 34)), new ECBlocks(16, new ECB(1, 28)), new ECBlocks(22, new ECB(1, 22)), new ECBlocks(28, new ECB(1, 16))), new Version(3, new Array(6, 22), new ECBlocks(15, new ECB(1, 55)), new ECBlocks(26, new ECB(1, 44)), new ECBlocks(18, new ECB(2, 17)), new ECBlocks(22, new ECB(2, 13))), new Version(4, new Array(6, 26), new ECBlocks(20, new ECB(1, 80)), new ECBlocks(18, new ECB(2, 32)), new ECBlocks(26, new ECB(2, 24)), new ECBlocks(16, new ECB(4, 9))), new Version(5, new Array(6, 30), new ECBlocks(26, new ECB(1, 108)), new ECBlocks(24, new ECB(2, 43)), new ECBlocks(18, new ECB(2, 15), new ECB(2, 16)), new ECBlocks(22, new ECB(2, 11), new ECB(2, 12))), new Version(6, new Array(6, 34), new ECBlocks(18, new ECB(2, 68)), new ECBlocks(16, new ECB(4, 27)), new ECBlocks(24, new ECB(4, 19)), new ECBlocks(28, new ECB(4, 15))), new Version(7, new Array(6, 22, 38), new ECBlocks(20, new ECB(2, 78)), new ECBlocks(18, new ECB(4, 31)), new ECBlocks(18, new ECB(2, 14), new ECB(4, 15)), new ECBlocks(26, new ECB(4, 13), new ECB(1, 14))), new Version(8, new Array(6, 24, 42), new ECBlocks(24, new ECB(2, 97)), new ECBlocks(22, new ECB(2, 38), new ECB(2, 39)), new ECBlocks(22, new ECB(4, 18), new ECB(2, 19)), new ECBlocks(26, new ECB(4, 14), new ECB(2, 15))), new Version(9, new Array(6, 26, 46), new ECBlocks(30, new ECB(2, 116)), new ECBlocks(22, new ECB(3, 36), new ECB(2, 37)), new ECBlocks(20, new ECB(4, 16), new ECB(4, 17)), new ECBlocks(24, new ECB(4, 12), new ECB(4, 13))), new Version(10, new Array(6, 28, 50), new ECBlocks(18, new ECB(2, 68), new ECB(2, 69)), new ECBlocks(26, new ECB(4, 43), new ECB(1, 44)), new ECBlocks(24, new ECB(6, 19), new ECB(2, 20)), new ECBlocks(28, new ECB(6, 15), new ECB(2, 16))), new Version(11, new Array(6, 30, 54), new ECBlocks(20, new ECB(4, 81)), new ECBlocks(30, new ECB(1, 50), new ECB(4, 51)), new ECBlocks(28, new ECB(4, 22), new ECB(4, 23)), new ECBlocks(24, new ECB(3, 12), new ECB(8, 13))), new Version(12, new Array(6, 32, 58), new ECBlocks(24, new ECB(2, 92), new ECB(2, 93)), new ECBlocks(22, new ECB(6, 36), new ECB(2, 37)), new ECBlocks(26, new ECB(4, 20), new ECB(6, 21)), new ECBlocks(28, new ECB(7, 14), new ECB(4, 15))), new Version(13, new Array(6, 34, 62), new ECBlocks(26, new ECB(4, 107)), new ECBlocks(22, new ECB(8, 37), new ECB(1, 38)), new ECBlocks(24, new ECB(8, 20), new ECB(4, 21)), new ECBlocks(22, new ECB(12, 11), new ECB(4, 12))), new Version(14, new Array(6, 26, 46, 66), new ECBlocks(30, new ECB(3, 115), new ECB(1, 116)), new ECBlocks(24, new ECB(4, 40), new ECB(5, 41)), new ECBlocks(20, new ECB(11, 16), new ECB(5, 17)), new ECBlocks(24, new ECB(11, 12), new ECB(5, 13))), new Version(15, new Array(6, 26, 48, 70), new ECBlocks(22, new ECB(5, 87), new ECB(1, 88)), new ECBlocks(24, new ECB(5, 41), new ECB(5, 42)), new ECBlocks(30, new ECB(5, 24), new ECB(7, 25)), new ECBlocks(24, new ECB(11, 12), new ECB(7, 13))), new Version(16, new Array(6, 26, 50, 74), new ECBlocks(24, new ECB(5, 98), new ECB(1, 99)), new ECBlocks(28, new ECB(7, 45), new ECB(3, 46)), new ECBlocks(24, new ECB(15, 19), new ECB(2, 20)), new ECBlocks(30, new ECB(3, 15), new ECB(13, 16))), new Version(17, new Array(6, 30, 54, 78), new ECBlocks(28, new ECB(1, 107), new ECB(5, 108)), new ECBlocks(28, new ECB(10, 46), new ECB(1, 47)), new ECBlocks(28, new ECB(1, 22), new ECB(15, 23)), new ECBlocks(28, new ECB(2, 14), new ECB(17, 15))), new Version(18, new Array(6, 30, 56, 82), new ECBlocks(30, new ECB(5, 120), new ECB(1, 121)), new ECBlocks(26, new ECB(9, 43), new ECB(4, 44)), new ECBlocks(28, new ECB(17, 22), new ECB(1, 23)), new ECBlocks(28, new ECB(2, 14), new ECB(19, 15))), new Version(19, new Array(6, 30, 58, 86), new ECBlocks(28, new ECB(3, 113), new ECB(4, 114)), new ECBlocks(26, new ECB(3, 44), new ECB(11, 45)), new ECBlocks(26, new ECB(17, 21), new ECB(4, 22)), new ECBlocks(26, new ECB(9, 13), new ECB(16, 14))), new Version(20, new Array(6, 34, 62, 90), new ECBlocks(28, new ECB(3, 107), new ECB(5, 108)), new ECBlocks(26, new ECB(3, 41), new ECB(13, 42)), new ECBlocks(30, new ECB(15, 24), new ECB(5, 25)), new ECBlocks(28, new ECB(15, 15), new ECB(10, 16))), new Version(21, new Array(6, 28, 50, 72, 94), new ECBlocks(28, new ECB(4, 116), new ECB(4, 117)), new ECBlocks(26, new ECB(17, 42)), new ECBlocks(28, new ECB(17, 22), new ECB(6, 23)), new ECBlocks(30, new ECB(19, 16), new ECB(6, 17))), new Version(22, new Array(6, 26, 50, 74, 98), new ECBlocks(28, new ECB(2, 111), new ECB(7, 112)), new ECBlocks(28, new ECB(17, 46)), new ECBlocks(30, new ECB(7, 24), new ECB(16, 25)), new ECBlocks(24, new ECB(34, 13))), new Version(23, new Array(6, 30, 54, 74, 102), new ECBlocks(30, new ECB(4, 121), new ECB(5, 122)), new ECBlocks(28, new ECB(4, 47), new ECB(14, 48)), new ECBlocks(30, new ECB(11, 24), new ECB(14, 25)), new ECBlocks(30, new ECB(16, 15), new ECB(14, 16))), new Version(24, new Array(6, 28, 54, 80, 106), new ECBlocks(30, new ECB(6, 117), new ECB(4, 118)), new ECBlocks(28, new ECB(6, 45), new ECB(14, 46)), new ECBlocks(30, new ECB(11, 24), new ECB(16, 25)), new ECBlocks(30, new ECB(30, 16), new ECB(2, 17))), new Version(25, new Array(6, 32, 58, 84, 110), new ECBlocks(26, new ECB(8, 106), new ECB(4, 107)), new ECBlocks(28, new ECB(8, 47), new ECB(13, 48)), new ECBlocks(30, new ECB(7, 24), new ECB(22, 25)), new ECBlocks(30, new ECB(22, 15), new ECB(13, 16))), new Version(26, new Array(6, 30, 58, 86, 114), new ECBlocks(28, new ECB(10, 114), new ECB(2, 115)), new ECBlocks(28, new ECB(19, 46), new ECB(4, 47)), new ECBlocks(28, new ECB(28, 22), new ECB(6, 23)), new ECBlocks(30, new ECB(33, 16), new ECB(4, 17))), new Version(27, new Array(6, 34, 62, 90, 118), new ECBlocks(30, new ECB(8, 122), new ECB(4, 123)), new ECBlocks(28, new ECB(22, 45), new ECB(3, 46)), new ECBlocks(30, new ECB(8, 23), new ECB(26, 24)), new ECBlocks(30, new ECB(12, 15), new ECB(28, 16))), new Version(28, new Array(6, 26, 50, 74, 98, 122), new ECBlocks(30, new ECB(3, 117), new ECB(10, 118)), new ECBlocks(28, new ECB(3, 45), new ECB(23, 46)), new ECBlocks(30, new ECB(4, 24), new ECB(31, 25)), new ECBlocks(30, new ECB(11, 15), new ECB(31, 16))), new Version(29, new Array(6, 30, 54, 78, 102, 126), new ECBlocks(30, new ECB(7, 116), new ECB(7, 117)), new ECBlocks(28, new ECB(21, 45), new ECB(7, 46)), new ECBlocks(30, new ECB(1, 23), new ECB(37, 24)), new ECBlocks(30, new ECB(19, 15), new ECB(26, 16))), new Version(30, new Array(6, 26, 52, 78, 104, 130), new ECBlocks(30, new ECB(5, 115), new ECB(10, 116)), new ECBlocks(28, new ECB(19, 47), new ECB(10, 48)), new ECBlocks(30, new ECB(15, 24), new ECB(25, 25)), new ECBlocks(30, new ECB(23, 15), new ECB(25, 16))), new Version(31, new Array(6, 30, 56, 82, 108, 134), new ECBlocks(30, new ECB(13, 115), new ECB(3, 116)), new ECBlocks(28, new ECB(2, 46), new ECB(29, 47)), new ECBlocks(30, new ECB(42, 24), new ECB(1, 25)), new ECBlocks(30, new ECB(23, 15), new ECB(28, 16))), new Version(32, new Array(6, 34, 60, 86, 112, 138), new ECBlocks(30, new ECB(17, 115)), new ECBlocks(28, new ECB(10, 46), new ECB(23, 47)), new ECBlocks(30, new ECB(10, 24), new ECB(35, 25)), new ECBlocks(30, new ECB(19, 15), new ECB(35, 16))), new Version(33, new Array(6, 30, 58, 86, 114, 142), new ECBlocks(30, new ECB(17, 115), new ECB(1, 116)), new ECBlocks(28, new ECB(14, 46), new ECB(21, 47)), new ECBlocks(30, new ECB(29, 24), new ECB(19, 25)), new ECBlocks(30, new ECB(11, 15), new ECB(46, 16))), new Version(34, new Array(6, 34, 62, 90, 118, 146), new ECBlocks(30, new ECB(13, 115), new ECB(6, 116)), new ECBlocks(28, new ECB(14, 46), new ECB(23, 47)), new ECBlocks(30, new ECB(44, 24), new ECB(7, 25)), new ECBlocks(30, new ECB(59, 16), new ECB(1, 17))), new Version(35, new Array(6, 30, 54, 78, 102, 126, 150), new ECBlocks(30, new ECB(12, 121), new ECB(7, 122)), new ECBlocks(28, new ECB(12, 47), new ECB(26, 48)), new ECBlocks(30, new ECB(39, 24), new ECB(14, 25)), new ECBlocks(30, new ECB(22, 15), new ECB(41, 16))), new Version(36, new Array(6, 24, 50, 76, 102, 128, 154), new ECBlocks(30, new ECB(6, 121), new ECB(14, 122)), new ECBlocks(28, new ECB(6, 47), new ECB(34, 48)), new ECBlocks(30, new ECB(46, 24), new ECB(10, 25)), new ECBlocks(30, new ECB(2, 15), new ECB(64, 16))), new Version(37, new Array(6, 28, 54, 80, 106, 132, 158), new ECBlocks(30, new ECB(17, 122), new ECB(4, 123)), new ECBlocks(28, new ECB(29, 46), new ECB(14, 47)), new ECBlocks(30, new ECB(49, 24), new ECB(10, 25)), new ECBlocks(30, new ECB(24, 15), new ECB(46, 16))), new Version(38, new Array(6, 32, 58, 84, 110, 136, 162), new ECBlocks(30, new ECB(4, 122), new ECB(18, 123)), new ECBlocks(28, new ECB(13, 46), new ECB(32, 47)), new ECBlocks(30, new ECB(48, 24), new ECB(14, 25)), new ECBlocks(30, new ECB(42, 15), new ECB(32, 16))), new Version(39, new Array(6, 26, 54, 82, 110, 138, 166), new ECBlocks(30, new ECB(20, 117), new ECB(4, 118)), new ECBlocks(28, new ECB(40, 47), new ECB(7, 48)), new ECBlocks(30, new ECB(43, 24), new ECB(22, 25)), new ECBlocks(30, new ECB(10, 15), new ECB(67, 16))), new Version(40, new Array(6, 30, 58, 86, 114, 142, 170), new ECBlocks(30, new ECB(19, 118), new ECB(6, 119)), new ECBlocks(28, new ECB(18, 47), new ECB(31, 48)), new ECBlocks(30, new ECB(34, 24), new ECB(34, 25)), new ECBlocks(30, new ECB(20, 15), new ECB(61, 16))));
    };
    return Version;
}());
Version.VERSION_DECODE_INFO = new Array(0x07C94, 0x085BC, 0x09A99, 0x0A4D3, 0x0BBF6, 0x0C762, 0x0D847, 0x0E60D, 0x0F928, 0x10B78, 0x1145D, 0x12A17, 0x13532, 0x149A6, 0x15683, 0x168C9, 0x177EC, 0x18EC4, 0x191E1, 0x1AFAB, 0x1B08E, 0x1CC1A, 0x1D33F, 0x1ED75, 0x1F250, 0x209D5, 0x216F0, 0x228BA, 0x2379F, 0x24B0B, 0x2542E, 0x26A64, 0x27541, 0x28C69);
Version.VERSIONS = Version.buildVersions();
if (!Array.prototype.remove) {
    Array.prototype.remove = function (from) {
        var rest = this.slice((from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };
}
var FinderPattern = /** @class */ (function () {
    function FinderPattern(posX, posY, estimatedModuleSize) {
        this.incrementCount = function () {
            this.count++;
        };
        this.aboutEquals = function (moduleSize, i, j) {
            if (Math.abs(i - this.y) <= moduleSize && Math.abs(j - this.x) <= moduleSize) {
                var moduleSizeDiff = Math.abs(moduleSize - this.estimatedModuleSize);
                return moduleSizeDiff <= 1.0 || moduleSizeDiff / this.estimatedModuleSize <= 1.0;
            }
            return false;
        };
        this.x = posX;
        this.y = posY;
        this.count = 1;
        this.estimatedModuleSize = estimatedModuleSize;
    }
    Object.defineProperty(FinderPattern.prototype, "EstimatedModuleSize", {
        get: function () {
            return this.estimatedModuleSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FinderPattern.prototype, "Count", {
        get: function () {
            return this.count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FinderPattern.prototype, "X", {
        get: function () {
            return this.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FinderPattern.prototype, "Y", {
        get: function () {
            return this.y;
        },
        enumerable: true,
        configurable: true
    });
    return FinderPattern;
}());
FinderPattern.MIN_SKIP = 3;
FinderPattern.MAX_MODULES = 57;
FinderPattern.INTEGER_MATH_SHIFT = 8;
FinderPattern.CENTER_QUORUM = 2;
var FinderPatternInfo = /** @class */ (function () {
    function FinderPatternInfo(patternCenters) {
        this.bottomLeft = patternCenters[0];
        this.topLeft = patternCenters[1];
        this.topRight = patternCenters[2];
    }
    Object.defineProperty(FinderPatternInfo.prototype, "BottomLeft", {
        get: function () {
            return this.bottomLeft;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FinderPatternInfo.prototype, "TopLeft", {
        get: function () {
            return this.topLeft;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FinderPatternInfo.prototype, "TopRight", {
        get: function () {
            return this.topRight;
        },
        enumerable: true,
        configurable: true
    });
    return FinderPatternInfo;
}());
var FinderPatternFinder = /** @class */ (function () {
    function FinderPatternFinder(width, height) {
        this.possibleCenters = new Array();
        this.hasSkipped = false;
        this.crossCheckStateCount = new Array(0, 0, 0, 0, 0);
        this.orderBestPatterns = function (patterns) {
            function distance(pattern1, pattern2) {
                var xDiff = pattern1.X - pattern2.X;
                var yDiff = pattern1.Y - pattern2.Y;
                return Math.sqrt((xDiff * xDiff + yDiff * yDiff));
            }
            function crossProductZ(pointA, pointB, pointC) {
                var bX = pointB.x;
                var bY = pointB.y;
                return ((pointC.x - bX) * (pointA.y - bY)) - ((pointC.y - bY) * (pointA.x - bX));
            }
            var zeroOneDistance = distance(patterns[0], patterns[1]);
            var oneTwoDistance = distance(patterns[1], patterns[2]);
            var zeroTwoDistance = distance(patterns[0], patterns[2]);
            var pointA, pointB, pointC;
            if (oneTwoDistance >= zeroOneDistance && oneTwoDistance >= zeroTwoDistance) {
                pointB = patterns[0];
                pointA = patterns[1];
                pointC = patterns[2];
            }
            else if (zeroTwoDistance >= oneTwoDistance && zeroTwoDistance >= zeroOneDistance) {
                pointB = patterns[1];
                pointA = patterns[0];
                pointC = patterns[2];
            }
            else {
                pointB = patterns[2];
                pointA = patterns[0];
                pointC = patterns[1];
            }
            if (crossProductZ(pointA, pointB, pointC) < 0.0) {
                var temp = pointA;
                pointA = pointC;
                pointC = temp;
            }
            patterns[0] = pointA;
            patterns[1] = pointB;
            patterns[2] = pointC;
        };
        this.foundPatternCross = function (stateCount) {
            var totalModuleSize = 0;
            for (var i = 0; i < 5; i++) {
                var count = stateCount[i];
                if (count == 0) {
                    return false;
                }
                totalModuleSize += count;
            }
            if (totalModuleSize < 7) {
                return false;
            }
            var moduleSize = Math.floor((totalModuleSize << FinderPattern.INTEGER_MATH_SHIFT) / 7);
            var maxVariance = Math.floor(moduleSize / 2);
            return Math.abs(moduleSize - (stateCount[0]
                << FinderPattern.INTEGER_MATH_SHIFT)) < maxVariance && Math.abs(moduleSize - (stateCount[1]
                << FinderPattern.INTEGER_MATH_SHIFT)) < maxVariance && Math.abs(3 * moduleSize - (stateCount[2]
                << FinderPattern.INTEGER_MATH_SHIFT)) < 3 * maxVariance && Math.abs(moduleSize - (stateCount[3]
                << FinderPattern.INTEGER_MATH_SHIFT)) < maxVariance && Math.abs(moduleSize - (stateCount[4]
                << FinderPattern.INTEGER_MATH_SHIFT)) < maxVariance;
        };
        this.centerFromEnd = function (stateCount, end) {
            return (end - stateCount[4] - stateCount[3]) - stateCount[2] / 2.0;
        };
        this.crossCheckVertical = function (startI, centerJ, maxCount, originalStateCountTotal) {
            var image = this.image;
            var maxI = this.height;
            var stateCount = this.CrossCheckStateCount;
            var i = startI;
            while (i >= 0 && image[centerJ + i * this.width]) {
                stateCount[2]++;
                i--;
            }
            if (i < 0) {
                return NaN;
            }
            while (i >= 0 && !image[centerJ + i * this.width] && stateCount[1] <= maxCount) {
                stateCount[1]++;
                i--;
            }
            if (i < 0 || stateCount[1] > maxCount) {
                return NaN;
            }
            while (i >= 0 && image[centerJ + i * this.width] && stateCount[0] <= maxCount) {
                stateCount[0]++;
                i--;
            }
            if (stateCount[0] > maxCount) {
                return NaN;
            }
            i = startI + 1;
            while (i < maxI && image[centerJ + i * this.width]) {
                stateCount[2]++;
                i++;
            }
            if (i == maxI) {
                return NaN;
            }
            while (i < maxI && !image[centerJ + i * this.width] && stateCount[3] < maxCount) {
                stateCount[3]++;
                i++;
            }
            if (i == maxI || stateCount[3] >= maxCount) {
                return NaN;
            }
            while (i < maxI && image[centerJ + i * this.width] && stateCount[4] < maxCount) {
                stateCount[4]++;
                i++;
            }
            if (stateCount[4] >= maxCount) {
                return NaN;
            }
            var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2] + stateCount[3] + stateCount[4];
            if (5 * Math.abs(stateCountTotal - originalStateCountTotal) >= 2 * originalStateCountTotal) {
                return NaN;
            }
            return this.foundPatternCross(stateCount) ? this.centerFromEnd(stateCount, i) : NaN;
        };
        this.crossCheckHorizontal = function (startJ, centerI, maxCount, originalStateCountTotal) {
            var image = this.image;
            var maxJ = this.width;
            var stateCount = this.CrossCheckStateCount;
            var j = startJ;
            while (j >= 0 && image[j + centerI * this.width]) {
                stateCount[2]++;
                j--;
            }
            if (j < 0) {
                return NaN;
            }
            while (j >= 0 && !image[j + centerI * this.width] && stateCount[1] <= maxCount) {
                stateCount[1]++;
                j--;
            }
            if (j < 0 || stateCount[1] > maxCount) {
                return NaN;
            }
            while (j >= 0 && image[j + centerI * this.width] && stateCount[0] <= maxCount) {
                stateCount[0]++;
                j--;
            }
            if (stateCount[0] > maxCount) {
                return NaN;
            }
            j = startJ + 1;
            while (j < maxJ && image[j + centerI * this.width]) {
                stateCount[2]++;
                j++;
            }
            if (j == maxJ) {
                return NaN;
            }
            while (j < maxJ && !image[j + centerI * this.width] && stateCount[3] < maxCount) {
                stateCount[3]++;
                j++;
            }
            if (j == maxJ || stateCount[3] >= maxCount) {
                return NaN;
            }
            while (j < maxJ && image[j + centerI * this.width] && stateCount[4] < maxCount) {
                stateCount[4]++;
                j++;
            }
            if (stateCount[4] >= maxCount) {
                return NaN;
            }
            var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2] + stateCount[3] + stateCount[4];
            if (5 * Math.abs(stateCountTotal - originalStateCountTotal) >= originalStateCountTotal) {
                return NaN;
            }
            return this.foundPatternCross(stateCount) ? this.centerFromEnd(stateCount, j) : NaN;
        };
        this.handlePossibleCenter = function (stateCount, i, j) {
            var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2] + stateCount[3] + stateCount[4];
            var centerJ = this.centerFromEnd(stateCount, j);
            var centerI = this.crossCheckVertical(i, Math.floor(centerJ), stateCount[2], stateCountTotal);
            if (!isNaN(centerI)) {
                centerJ = this.crossCheckHorizontal(Math.floor(centerJ), Math.floor(centerI), stateCount[2], stateCountTotal);
                if (!isNaN(centerJ)) {
                    var estimatedModuleSize = stateCountTotal / 7.0;
                    var found = false;
                    var max = this.possibleCenters.length;
                    for (var index = 0; index < max; index++) {
                        var center = this.possibleCenters[index];
                        if (center.aboutEquals(estimatedModuleSize, centerI, centerJ)) {
                            center.incrementCount();
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        var point = new FinderPattern(centerJ, centerI, estimatedModuleSize);
                        this.possibleCenters.push(point);
                        if (this.resultPointCallback != null) {
                            this.resultPointCallback.foundPossibleResultPoint(point);
                        }
                    }
                    return true;
                }
            }
            return false;
        };
        this.selectBestPatterns = function () {
            var startSize = this.possibleCenters.length;
            if (startSize < 3) {
                throw "Couldn't find enough finder patterns (found: " + startSize + ")";
            }
            if (startSize > 3) {
                var totalModuleSize = 0.0;
                var square = 0.0;
                for (var i = 0; i < startSize; i++) {
                    var centerValue = this.possibleCenters[i].EstimatedModuleSize;
                    totalModuleSize += centerValue;
                    square += (centerValue * centerValue);
                }
                var average = totalModuleSize / startSize;
                this.possibleCenters.sort(function (center1, center2) {
                    var dA = Math.abs(center2.EstimatedModuleSize - average);
                    var dB = Math.abs(center1.EstimatedModuleSize - average);
                    if (dA < dB) {
                        return (-1);
                    }
                    else if (dA == dB) {
                        return 0;
                    }
                    else {
                        return 1;
                    }
                });
                var stdDev = Math.sqrt(square / startSize - average * average);
                var limit = Math.max(0.2 * average, stdDev);
                for (var i = this.possibleCenters.length - 1; i >= 0; i--) {
                    var pattern = this.possibleCenters[i];
                    if (Math.abs(pattern.EstimatedModuleSize - average) > limit) {
                        this.possibleCenters.remove(i);
                    }
                }
            }
            if (this.possibleCenters.length > 3) {
                this.possibleCenters.sort(function (a, b) {
                    if (a.count > b.count) {
                        return -1;
                    }
                    if (a.count < b.count) {
                        return 1;
                    }
                    return 0;
                });
            }
            return new Array(this.possibleCenters[0], this.possibleCenters[1], this.possibleCenters[2]);
        };
        this.findRowSkip = function () {
            var max = this.possibleCenters.length;
            if (max <= 1) {
                return 0;
            }
            var firstConfirmedCenter = null;
            for (var i = 0; i < max; i++) {
                var center = this.possibleCenters[i];
                if (center.Count >= FinderPattern.CENTER_QUORUM) {
                    if (firstConfirmedCenter == null) {
                        firstConfirmedCenter = center;
                    }
                    else {
                        this.hasSkipped = true;
                        return Math.floor((Math.abs(firstConfirmedCenter.X - center.X) - Math.abs(firstConfirmedCenter.Y - center.Y)) / 2);
                    }
                }
            }
            return 0;
        };
        this.haveMultiplyConfirmedCenters = function () {
            var confirmedCount = 0;
            var totalModuleSize = 0.0;
            var max = this.possibleCenters.length;
            for (var i = 0; i < max; i++) {
                var pattern = this.possibleCenters[i];
                if (pattern.Count >= FinderPattern.CENTER_QUORUM) {
                    confirmedCount++;
                    totalModuleSize += pattern.EstimatedModuleSize;
                }
            }
            if (confirmedCount < 3) {
                return false;
            }
            var average = totalModuleSize / max;
            var totalDeviation = 0.0;
            for (var i = 0; i < max; i++) {
                pattern = this.possibleCenters[i];
                totalDeviation += Math.abs(pattern.EstimatedModuleSize - average);
            }
            return totalDeviation <= 0.05 * totalModuleSize;
        };
        this.findFinderPattern = function (image) {
            var tryHarder = false;
            this.image = image;
            var maxI = this.height;
            var maxJ = this.width;
            var iSkip = Math.floor((3 * maxI) / (4 * FinderPattern.MAX_MODULES));
            if (iSkip < FinderPattern.MIN_SKIP || tryHarder) {
                iSkip = FinderPattern.MIN_SKIP;
            }
            var done = false;
            var stateCount = new Array(5);
            for (var i = iSkip - 1; i < maxI && !done; i += iSkip) {
                stateCount[0] = 0;
                stateCount[1] = 0;
                stateCount[2] = 0;
                stateCount[3] = 0;
                stateCount[4] = 0;
                var currentState = 0;
                for (var j = 0; j < maxJ; j++) {
                    if (image[j + i * this.width]) {
                        if ((currentState & 1) == 1) {
                            currentState++;
                        }
                        stateCount[currentState]++;
                    }
                    else {
                        if ((currentState & 1) == 0) {
                            if (currentState == 4) {
                                if (this.foundPatternCross(stateCount)) {
                                    var confirmed = this.handlePossibleCenter(stateCount, i, j);
                                    if (confirmed) {
                                        iSkip = 2;
                                        if (this.hasSkipped) {
                                            done = this.haveMultiplyConfirmedCenters();
                                        }
                                        else {
                                            var rowSkip = this.findRowSkip();
                                            if (rowSkip > stateCount[2]) {
                                                i += rowSkip - stateCount[2] - iSkip;
                                                j = maxJ - 1;
                                            }
                                        }
                                    }
                                    else {
                                        do {
                                            j++;
                                        } while (j < maxJ && !image[j + i * this.width]);
                                        j--;
                                    }
                                    currentState = 0;
                                    stateCount[0] = 0;
                                    stateCount[1] = 0;
                                    stateCount[2] = 0;
                                    stateCount[3] = 0;
                                    stateCount[4] = 0;
                                }
                                else {
                                    stateCount[0] = stateCount[2];
                                    stateCount[1] = stateCount[3];
                                    stateCount[2] = stateCount[4];
                                    stateCount[3] = 1;
                                    stateCount[4] = 0;
                                    currentState = 3;
                                }
                            }
                            else {
                                stateCount[++currentState]++;
                            }
                        }
                        else {
                            stateCount[currentState]++;
                        }
                    }
                }
                if (this.foundPatternCross(stateCount)) {
                    var confirmed = this.handlePossibleCenter(stateCount, i, maxJ);
                    if (confirmed) {
                        iSkip = stateCount[0];
                        if (this.hasSkipped) {
                            done = this.haveMultiplyConfirmedCenters();
                        }
                    }
                }
            }
            var patternInfo = this.selectBestPatterns();
            this.orderBestPatterns(patternInfo);
            return new FinderPatternInfo(patternInfo);
        };
        this.width = width;
        this.height = height;
    }
    Object.defineProperty(FinderPatternFinder.prototype, "CrossCheckStateCount", {
        get: function () {
            this.crossCheckStateCount[0] = 0;
            this.crossCheckStateCount[1] = 0;
            this.crossCheckStateCount[2] = 0;
            this.crossCheckStateCount[3] = 0;
            this.crossCheckStateCount[4] = 0;
            return this.crossCheckStateCount;
        },
        enumerable: true,
        configurable: true
    });
    return FinderPatternFinder;
}());
var DetectorResult = /** @class */ (function () {
    function DetectorResult(bits, points) {
        this.bits = bits;
        this.points = points;
    }
    return DetectorResult;
}());
var Detector = /** @class */ (function () {
    function Detector(image, rawImage, width, height) {
        this.calculateModuleSizeOneWay = function (pattern, otherPattern) {
            var moduleSizeEst1 = this.sizeOfBlackWhiteBlackRunBothWays(Math.floor(pattern.X), Math.floor(pattern.Y), Math.floor(otherPattern.X), Math.floor(otherPattern.Y));
            var moduleSizeEst2 = this.sizeOfBlackWhiteBlackRunBothWays(Math.floor(otherPattern.X), Math.floor(otherPattern.Y), Math.floor(pattern.X), Math.floor(pattern.Y));
            if (isNaN(moduleSizeEst1)) {
                return moduleSizeEst2 / 7.0;
            }
            if (isNaN(moduleSizeEst2)) {
                return moduleSizeEst1 / 7.0;
            }
            return (moduleSizeEst1 + moduleSizeEst2) / 14.0;
        };
        this.calculateModuleSize = function (topLeft, topRight, bottomLeft) {
            return (this.calculateModuleSizeOneWay(topLeft, topRight) + this.calculateModuleSizeOneWay(topLeft, bottomLeft)) / 2.0;
        };
        this.distance = function (pattern1, pattern2) {
            var xDiff = pattern1.X - pattern2.X;
            var yDiff = pattern1.Y - pattern2.Y;
            return Math.sqrt((xDiff * xDiff + yDiff * yDiff));
        };
        this.computeDimension = function (topLeft, topRight, bottomLeft, moduleSize) {
            var tltrCentersDimension = Math.round(this.distance(topLeft, topRight) / moduleSize);
            var tlblCentersDimension = Math.round(this.distance(topLeft, bottomLeft) / moduleSize);
            var dimension = ((tltrCentersDimension + tlblCentersDimension) >> 1) + 7;
            switch (dimension & 0x03) {
                case 0:
                    dimension++;
                    break;
                case 2:
                    dimension--;
                    break;
                case 3:
                    throw "Error";
            }
            return dimension;
        };
        this.findAlignmentInRegion = function (overallEstModuleSize, estAlignmentX, estAlignmentY, allowanceFactor) {
            var allowance = Math.floor(allowanceFactor * overallEstModuleSize);
            var alignmentAreaLeftX = Math.max(0, estAlignmentX - allowance);
            var alignmentAreaRightX = Math.min(this.width - 1, estAlignmentX + allowance);
            if (alignmentAreaRightX - alignmentAreaLeftX < overallEstModuleSize * 3) {
                throw "Error";
            }
            var alignmentAreaTopY = Math.max(0, estAlignmentY - allowance);
            var alignmentAreaBottomY = Math.min(this.height - 1, estAlignmentY + allowance);
            var alignmentFinder = new AlignmentPatternFinder(this.image, alignmentAreaLeftX, alignmentAreaTopY, alignmentAreaRightX - alignmentAreaLeftX, alignmentAreaBottomY - alignmentAreaTopY, overallEstModuleSize, this.width, this.height, this.resultPointCallback);
            return alignmentFinder.find();
        };
        this.createTransform = function (topLeft, topRight, bottomLeft, alignmentPattern, dimension) {
            var dimMinusThree = dimension - 3.5;
            var bottomRightX;
            var bottomRightY;
            var sourceBottomRightX;
            var sourceBottomRightY;
            if (alignmentPattern != null) {
                bottomRightX = alignmentPattern.X;
                bottomRightY = alignmentPattern.Y;
                sourceBottomRightX = sourceBottomRightY = dimMinusThree - 3.0;
            }
            else {
                bottomRightX = (topRight.X - topLeft.X) + bottomLeft.X;
                bottomRightY = (topRight.Y - topLeft.Y) + bottomLeft.Y;
                sourceBottomRightX = sourceBottomRightY = dimMinusThree;
            }
            var transform = PerspectiveTransform.quadrilateralToQuadrilateral(3.5, 3.5, dimMinusThree, 3.5, sourceBottomRightX, sourceBottomRightY, 3.5, dimMinusThree, topLeft.X, topLeft.Y, topRight.X, topRight.Y, bottomRightX, bottomRightY, bottomLeft.X, bottomLeft.Y);
            return transform;
        };
        this.sampleGrid = function (image, transform, dimension) {
            var sampler = new GridSampler(this.width, this.height);
            return sampler.sampleGrid3(image, this.rawImage, dimension, transform);
        };
        this.detect = function () {
            var info = new FinderPatternFinder(this.width, this.height).findFinderPattern(this.image);
            return this.processFinderPatternInfo(info);
        };
        this.image = image;
        this.rawImage = rawImage;
        this.height = height;
        this.width = width;
    }
    Detector.prototype.sizeOfBlackWhiteBlackRun = function (fromX, fromY, toX, toY) {
        var steep = Math.abs(toY - fromY) > Math.abs(toX - fromX);
        if (steep) {
            var temp = fromX;
            fromX = fromY;
            fromY = temp;
            temp = toX;
            toX = toY;
            toY = temp;
        }
        var dx = Math.abs(toX - fromX);
        var dy = Math.abs(toY - fromY);
        var error = -dx >> 1;
        var ystep = fromY < toY ? 1 : -1;
        var xstep = fromX < toX ? 1 : -1;
        var state = 0;
        for (var x = fromX, y = fromY; x != toX; x += xstep) {
            var realX = steep ? y : x;
            var realY = steep ? x : y;
            if (state == 1) {
                if (this.image[realX + realY * this.width]) {
                    state++;
                }
            }
            else {
                if (!this.image[realX + realY * this.width]) {
                    state++;
                }
            }
            if (state == 3) {
                var diffX = x - fromX;
                var diffY = y - fromY;
                return Math.sqrt((diffX * diffX + diffY * diffY));
            }
            error += dy;
            if (error > 0) {
                if (y == toY) {
                    break;
                }
                y += ystep;
                error -= dx;
            }
        }
        var diffX2 = toX - fromX;
        var diffY2 = toY - fromY;
        return Math.sqrt((diffX2 * diffX2 + diffY2 * diffY2));
    };
    Detector.prototype.sizeOfBlackWhiteBlackRunBothWays = function (fromX, fromY, toX, toY) {
        var result = this.sizeOfBlackWhiteBlackRun(fromX, fromY, toX, toY);
        var scale = 1.0;
        var otherToX = fromX - (toX - fromX);
        if (otherToX < 0) {
            scale = fromX / (fromX - otherToX);
            otherToX = 0;
        }
        else if (otherToX >= this.width) {
            scale = (this.width - 1 - fromX) / (otherToX - fromX);
            otherToX = this.width - 1;
        }
        var otherToY = Math.floor(fromY - (toY - fromY) * scale);
        scale = 1.0;
        if (otherToY < 0) {
            scale = fromY / (fromY - otherToY);
            otherToY = 0;
        }
        else if (otherToY >= this.height) {
            scale = (this.height - 1 - fromY) / (otherToY - fromY);
            otherToY = this.height - 1;
        }
        otherToX = Math.floor(fromX + (otherToX - fromX) * scale);
        result += this.sizeOfBlackWhiteBlackRun(fromX, fromY, otherToX, otherToY);
        return result - 1.0;
    };
    Detector.prototype.processFinderPatternInfo = function (info) {
        var topLeft = info.TopLeft;
        var topRight = info.TopRight;
        var bottomLeft = info.BottomLeft;
        var moduleSize = this.calculateModuleSize(topLeft, topRight, bottomLeft);
        if (moduleSize < 1.0) {
            throw "Error";
        }
        var dimension = this.computeDimension(topLeft, topRight, bottomLeft, moduleSize);
        var provisionalVersion = Version.getProvisionalVersionForDimension(dimension);
        var modulesBetweenFPCenters = provisionalVersion.DimensionForVersion - 7;
        var alignmentPattern = null;
        if (provisionalVersion.AlignmentPatternCenters.length > 0) {
            var bottomRightX = topRight.X - topLeft.X + bottomLeft.X;
            var bottomRightY = topRight.Y - topLeft.Y + bottomLeft.Y;
            var correctionToTopLeft = 1.0 - 3.0 / modulesBetweenFPCenters;
            var estAlignmentX = Math.floor(topLeft.X + correctionToTopLeft * (bottomRightX - topLeft.X));
            var estAlignmentY = Math.floor(topLeft.Y + correctionToTopLeft * (bottomRightY - topLeft.Y));
            for (var i = 4; i <= 16; i <<= 1) {
                alignmentPattern = this.findAlignmentInRegion(moduleSize, estAlignmentX, estAlignmentY, i);
                break;
            }
        }
        var transform = this.createTransform(topLeft, topRight, bottomLeft, alignmentPattern, dimension);
        var bits = this.sampleGrid(this.image, transform, dimension);
        var points;
        if (alignmentPattern == null) {
            points = new Array(bottomLeft, topLeft, topRight);
        }
        else {
            points = new Array(bottomLeft, topLeft, topRight, alignmentPattern);
        }
        return new DetectorResult(bits, points);
    };
    return Detector;
}());
var GF256Poly = /** @class */ (function () {
    function GF256Poly(field, coefficients) {
        this.divide = function (other) {
            if (this.field != other.field) {
                throw "GF256Polys do not have same GF256 field";
            }
            if (other.Zero) {
                throw "Divide by 0";
            }
            var quotient = this.field.Zero;
            var remainder = this;
            var denominatorLeadingTerm = other.getCoefficient(other.Degree);
            var inverseDenominatorLeadingTerm = this.field.inverse(denominatorLeadingTerm);
            while (remainder.Degree >= other.Degree && !remainder.Zero) {
                var degreeDifference = remainder.Degree - other.Degree;
                var scale = this.field.multiply(remainder.getCoefficient(remainder.Degree), inverseDenominatorLeadingTerm);
                var term = other.multiplyByMonomial(degreeDifference, scale);
                var iterationQuotient = this.field.buildMonomial(degreeDifference, scale);
                quotient = quotient.addOrSubtract(iterationQuotient);
                remainder = remainder.addOrSubtract(term);
            }
            return new Array(quotient, remainder);
        };
        if (coefficients == null || coefficients.length == 0) {
            throw "System.ArgumentException";
        }
        this.field = field;
        var coefficientsLength = coefficients.length;
        if (coefficientsLength > 1 && coefficients[0] == 0) {
            var firstNonZero = 1;
            while (firstNonZero < coefficientsLength && coefficients[firstNonZero] == 0) {
                firstNonZero++;
            }
            if (firstNonZero == coefficientsLength) {
                this.coefficients = field.Zero.coefficients;
            }
            else {
                this.coefficients = new Array(coefficientsLength - firstNonZero);
                for (var i = 0; i < this.coefficients.length; i++)
                    this.coefficients[i] = 0;
                for (var ci = 0; ci < this.coefficients.length; ci++)
                    this.coefficients[ci] = coefficients[firstNonZero + ci];
            }
        }
        else {
            this.coefficients = coefficients;
        }
    }
    Object.defineProperty(GF256Poly.prototype, "Zero", {
        get: function () {
            return this.coefficients[0] == 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GF256Poly.prototype, "Degree", {
        get: function () {
            return this.coefficients.length - 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GF256Poly.prototype, "Coefficients", {
        get: function () {
            return this.coefficients;
        },
        enumerable: true,
        configurable: true
    });
    GF256Poly.prototype.getCoefficient = function (degree) {
        return this.coefficients[this.coefficients.length - 1 - degree];
    };
    GF256Poly.prototype.evaluateAt = function (a) {
        if (a == 0) {
            return this.getCoefficient(0);
        }
        var size = this.coefficients.length;
        if (a == 1) {
            var result = 0;
            for (var i = 0; i < size; i++) {
                result = GF256.addOrSubtract(result, this.coefficients[i]);
            }
            return result;
        }
        var result2 = this.coefficients[0];
        for (var i = 1; i < size; i++) {
            result2 = GF256.addOrSubtract(this.field.multiply(a, result2), this.coefficients[i]);
        }
        return result2;
    };
    GF256Poly.prototype.addOrSubtract = function (other) {
        if (this.field != other.field) {
            throw "GF256Polys do not have same GF256 field";
        }
        if (this.Zero) {
            return other;
        }
        if (other.Zero) {
            return this;
        }
        var smallerCoefficients = this.coefficients;
        var largerCoefficients = other.coefficients;
        if (smallerCoefficients.length > largerCoefficients.length) {
            var temp = smallerCoefficients;
            smallerCoefficients = largerCoefficients;
            largerCoefficients = temp;
        }
        var sumDiff = new Array(largerCoefficients.length);
        var lengthDiff = largerCoefficients.length - smallerCoefficients.length;
        for (var ci = 0; ci < lengthDiff; ci++)
            sumDiff[ci] = largerCoefficients[ci];
        for (var i = lengthDiff; i < largerCoefficients.length; i++) {
            sumDiff[i] = GF256.addOrSubtract(smallerCoefficients[i - lengthDiff], largerCoefficients[i]);
        }
        return new GF256Poly(this.field, sumDiff);
    };
    GF256Poly.prototype.multiply1 = function (other) {
        if (this.field != other.field) {
            throw "GF256Polys do not have same GF256 field";
        }
        if (this.Zero || other.Zero) {
            return this.field.Zero;
        }
        var aCoefficients = this.coefficients;
        var aLength = aCoefficients.length;
        var bCoefficients = other.coefficients;
        var bLength = bCoefficients.length;
        var product = new Array(aLength + bLength - 1);
        for (var i = 0; i < aLength; i++) {
            var aCoeff = aCoefficients[i];
            for (var j = 0; j < bLength; j++) {
                product[i + j] = GF256.addOrSubtract(product[i + j], this.field.multiply(aCoeff, bCoefficients[j]));
            }
        }
        return new GF256Poly(this.field, product);
    };
    GF256Poly.prototype.multiply2 = function (scalar) {
        if (scalar == 0) {
            return this.field.Zero;
        }
        if (scalar == 1) {
            return this;
        }
        var size = this.coefficients.length;
        var product = new Array(size);
        for (var i = 0; i < size; i++) {
            product[i] = this.field.multiply(this.coefficients[i], scalar);
        }
        return new GF256Poly(this.field, product);
    };
    GF256Poly.prototype.multiplyByMonomial = function (degree, coefficient) {
        if (degree < 0) {
            throw "System.ArgumentException";
        }
        if (coefficient == 0) {
            return this.field.Zero;
        }
        var size = this.coefficients.length;
        var product = new Array(size + degree);
        for (var i = 0; i < product.length; i++)
            product[i] = 0;
        for (var i = 0; i < size; i++) {
            product[i] = this.field.multiply(this.coefficients[i], coefficient);
        }
        return new GF256Poly(this.field, product);
    };
    return GF256Poly;
}());
var GF256 = /** @class */ (function () {
    function GF256(primitive) {
        this.expTable = new Array(256);
        this.logTable = new Array(256);
        var x = 1;
        for (var i = 0; i < 256; i++) {
            this.expTable[i] = x;
            x <<= 1;
            if (x >= 0x100) {
                x ^= primitive;
            }
        }
        for (var i = 0; i < 255; i++) {
            this.logTable[this.expTable[i]] = i;
        }
        var at0 = new Array(1);
        at0[0] = 0;
        this.zero = new GF256Poly(this, new Array(at0));
        var at1 = new Array(1);
        at1[0] = 1;
        this.one = new GF256Poly(this, new Array(at1));
    }
    Object.defineProperty(GF256.prototype, "Zero", {
        get: function () {
            return this.zero;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GF256.prototype, "One", {
        get: function () {
            return this.one;
        },
        enumerable: true,
        configurable: true
    });
    GF256.prototype.buildMonomial = function (degree, coefficient) {
        if (degree < 0) {
            throw "System.ArgumentException";
        }
        if (coefficient == 0) {
            return this.zero;
        }
        var coefficients = new Array(degree + 1);
        for (var i = 0; i < coefficients.length; i++)
            coefficients[i] = 0;
        coefficients[0] = coefficient;
        return new GF256Poly(this, coefficients);
    };
    GF256.prototype.exp = function (a) {
        return this.expTable[a];
    };
    GF256.prototype.log = function (a) {
        if (a == 0) {
            throw "System.ArgumentException";
        }
        return this.logTable[a];
    };
    GF256.prototype.inverse = function (a) {
        if (a == 0) {
            throw "System.ArithmeticException";
        }
        return this.expTable[255 - this.logTable[a]];
    };
    GF256.prototype.multiply = function (a, b) {
        if (a == 0 || b == 0) {
            return 0;
        }
        if (a == 1) {
            return b;
        }
        if (b == 1) {
            return a;
        }
        return this.expTable[(this.logTable[a] + this.logTable[b]) % 255];
    };
    GF256.addOrSubtract = function (a, b) {
        return a ^ b;
    };
    return GF256;
}());
GF256.QR_CODE_FIELD = new GF256(0x011D);
GF256.DATA_MATRIX_FIELD = new GF256(0x012D);
var ReedSolomonDecoder = /** @class */ (function () {
    function ReedSolomonDecoder(field) {
        this.field = field;
    }
    ReedSolomonDecoder.prototype.decode = function (received, twoS) {
        var poly = new GF256Poly(this.field, received);
        var syndromeCoefficients = new Array(twoS);
        for (var i = 0; i < syndromeCoefficients.length; i++)
            syndromeCoefficients[i] = 0;
        var dataMatrix = false;
        var noError = true;
        for (var i = 0; i < twoS; i++) {
            var evalu = poly.evaluateAt(this.field.exp(dataMatrix ? i + 1 : i));
            syndromeCoefficients[syndromeCoefficients.length - 1 - i] = evalu;
            if (evalu != 0) {
                noError = false;
            }
        }
        if (noError) {
            return;
        }
        var syndrome = new GF256Poly(this.field, syndromeCoefficients);
        var sigmaOmega = this.runEuclideanAlgorithm(this.field.buildMonomial(twoS, 1), syndrome, twoS);
        var sigma = sigmaOmega[0];
        var omega = sigmaOmega[1];
        var errorLocations = this.findErrorLocations(sigma);
        var errorMagnitudes = this.findErrorMagnitudes(omega, errorLocations, dataMatrix);
        for (var i = 0; i < errorLocations.length; i++) {
            var position = received.length - 1 - this.field.log(errorLocations[i]);
            if (position < 0) {
                throw "ReedSolomonException Bad error location";
            }
            received[position] = GF256.addOrSubtract(received[position], errorMagnitudes[i]);
        }
    };
    ReedSolomonDecoder.prototype.runEuclideanAlgorithm = function (a, b, R) {
        if (a.Degree < b.Degree) {
            var temp = a;
            a = b;
            b = temp;
        }
        var rLast = a;
        var r = b;
        var sLast = this.field.One;
        var s = this.field.Zero;
        var tLast = this.field.Zero;
        var t = this.field.One;
        while (r.Degree >= Math.floor(R / 2)) {
            var rLastLast = rLast;
            var sLastLast = sLast;
            var tLastLast = tLast;
            rLast = r;
            sLast = s;
            tLast = t;
            if (rLast.Zero) {
                throw "r_{i-1} was zero";
            }
            r = rLastLast;
            var q = this.field.Zero;
            var denominatorLeadingTerm = rLast.getCoefficient(rLast.Degree);
            var dltInverse = this.field.inverse(denominatorLeadingTerm);
            while (r.Degree >= rLast.Degree && !r.Zero) {
                var degreeDiff = r.Degree - rLast.Degree;
                var scale = this.field.multiply(r.getCoefficient(r.Degree), dltInverse);
                q = q.addOrSubtract(this.field.buildMonomial(degreeDiff, scale));
                r = r.addOrSubtract(rLast.multiplyByMonomial(degreeDiff, scale));
            }
            s = q.multiply1(sLast).addOrSubtract(sLastLast);
            t = q.multiply1(tLast).addOrSubtract(tLastLast);
        }
        var sigmaTildeAtZero = t.getCoefficient(0);
        if (sigmaTildeAtZero == 0) {
            throw "ReedSolomonException sigmaTilde(0) was zero";
        }
        var inverse = this.field.inverse(sigmaTildeAtZero);
        var sigma = t.multiply2(inverse);
        var omega = r.multiply2(inverse);
        return new Array(sigma, omega);
    };
    ReedSolomonDecoder.prototype.findErrorLocations = function (errorLocator) {
        var numErrors = errorLocator.Degree;
        if (numErrors == 1) {
            return new Array(errorLocator.getCoefficient(1));
        }
        var result = new Array(numErrors);
        var e = 0;
        for (var i = 1; i < 256 && e < numErrors; i++) {
            if (errorLocator.evaluateAt(i) == 0) {
                result[e] = this.field.inverse(i);
                e++;
            }
        }
        if (e != numErrors) {
            throw "Error locator degree does not match number of roots";
        }
        return result;
    };
    ReedSolomonDecoder.prototype.findErrorMagnitudes = function (errorEvaluator, errorLocations, dataMatrix) {
        var s = errorLocations.length;
        var result = new Array(s);
        for (var i = 0; i < s; i++) {
            var xiInverse = this.field.inverse(errorLocations[i]);
            var denominator = 1;
            for (var j = 0; j < s; j++) {
                if (i != j) {
                    denominator = this.field.multiply(denominator, GF256.addOrSubtract(1, this.field.multiply(errorLocations[j], xiInverse)));
                }
            }
            result[i] = this.field.multiply(errorEvaluator.evaluateAt(xiInverse), this.field.inverse(denominator));
            if (dataMatrix) {
                result[i] = this.field.multiply(result[i], xiInverse);
            }
        }
        return result;
    };
    return ReedSolomonDecoder;
}());
var DataMask000 = /** @class */ (function () {
    function DataMask000() {
        this.isMasked = function (i, j) {
            return ((i + j) & 0x01) == 0;
        };
    }
    DataMask000.prototype.unmaskBitMatrix = function (bits, dimension) {
        for (var i = 0; i < dimension; i++) {
            for (var j = 0; j < dimension; j++) {
                if (this.isMasked(i, j)) {
                    bits.flip(j, i);
                }
            }
        }
    };
    return DataMask000;
}());
var DataMask001 = /** @class */ (function () {
    function DataMask001() {
        this.isMasked = function (i, j) {
            return (i & 0x01) == 0;
        };
    }
    DataMask001.prototype.unmaskBitMatrix = function (bits, dimension) {
        for (var i = 0; i < dimension; i++) {
            for (var j = 0; j < dimension; j++) {
                if (this.isMasked(i, j)) {
                    bits.flip(j, i);
                }
            }
        }
    };
    return DataMask001;
}());
var DataMask010 = /** @class */ (function () {
    function DataMask010() {
        this.isMasked = function (i, j) {
            return j % 3 == 0;
        };
    }
    DataMask010.prototype.unmaskBitMatrix = function (bits, dimension) {
        for (var i = 0; i < dimension; i++) {
            for (var j = 0; j < dimension; j++) {
                if (this.isMasked(i, j)) {
                    bits.flip(j, i);
                }
            }
        }
    };
    return DataMask010;
}());
var DataMask011 = /** @class */ (function () {
    function DataMask011() {
        this.isMasked = function (i, j) {
            return (i + j) % 3 == 0;
        };
    }
    DataMask011.prototype.unmaskBitMatrix = function (bits, dimension) {
        for (var i = 0; i < dimension; i++) {
            for (var j = 0; j < dimension; j++) {
                if (this.isMasked(i, j)) {
                    bits.flip(j, i);
                }
            }
        }
    };
    return DataMask011;
}());
var DataMask100 = /** @class */ (function () {
    function DataMask100() {
        this.isMasked = function (i, j) {
            return (((this.URShift(i, 1)) + (j / 3)) & 0x01) == 0;
        };
    }
    DataMask100.prototype.unmaskBitMatrix = function (bits, dimension) {
        for (var i = 0; i < dimension; i++) {
            for (var j = 0; j < dimension; j++) {
                if (this.isMasked(i, j)) {
                    bits.flip(j, i);
                }
            }
        }
    };
    DataMask100.prototype.URShift = function (number, bits) {
        if (number >= 0)
            return number >> bits;
        else
            return (number >> bits) + (2 << ~bits);
    };
    return DataMask100;
}());
var DataMask101 = /** @class */ (function () {
    function DataMask101() {
        this.isMasked = function (i, j) {
            var temp = i * j;
            return (temp & 0x01) + (temp % 3) == 0;
        };
    }
    DataMask101.prototype.unmaskBitMatrix = function (bits, dimension) {
        for (var i = 0; i < dimension; i++) {
            for (var j = 0; j < dimension; j++) {
                if (this.isMasked(i, j)) {
                    bits.flip(j, i);
                }
            }
        }
    };
    return DataMask101;
}());
var DataMask110 = /** @class */ (function () {
    function DataMask110() {
        this.isMasked = function (i, j) {
            var temp = i * j;
            return (((temp & 0x01) + (temp % 3)) & 0x01) == 0;
        };
    }
    DataMask110.prototype.unmaskBitMatrix = function (bits, dimension) {
        for (var i = 0; i < dimension; i++) {
            for (var j = 0; j < dimension; j++) {
                if (this.isMasked(i, j)) {
                    bits.flip(j, i);
                }
            }
        }
    };
    return DataMask110;
}());
var DataMask111 = /** @class */ (function () {
    function DataMask111() {
        this.isMasked = function (i, j) {
            return ((((i + j) & 0x01) + ((i * j) % 3)) & 0x01) == 0;
        };
    }
    DataMask111.prototype.unmaskBitMatrix = function (bits, dimension) {
        for (var i = 0; i < dimension; i++) {
            for (var j = 0; j < dimension; j++) {
                if (this.isMasked(i, j)) {
                    bits.flip(j, i);
                }
            }
        }
    };
    return DataMask111;
}());
var DataMask = /** @class */ (function () {
    function DataMask() {
    }
    DataMask.forReference = function (reference) {
        if (reference < 0 || reference > 7) {
            throw "System.ArgumentException";
        }
        return DataMask.DATA_MASKS[reference];
    };
    return DataMask;
}());
DataMask.DATA_MASKS = new Array(new DataMask000(), new DataMask001(), new DataMask010(), new DataMask011(), new DataMask100(), new DataMask101(), new DataMask110(), new DataMask111());
var BitMatrixParser = /** @class */ (function () {
    function BitMatrixParser(bitmatrix) {
        var dimension = bitmatrix.Dimension;
        if (dimension < 21 || (dimension & 0x03) != 1) {
            throw "Error BitMatrixParser";
        }
        this.bitMatrix = bitmatrix;
    }
    BitMatrixParser.prototype.copyBit = function (i, j, versionBits) {
        return this.bitMatrix.get_Renamed(i, j) ? (versionBits << 1) | 0x1 : versionBits << 1;
    };
    BitMatrixParser.prototype.readFormatInformation = function () {
        if (this.parsedFormatInfo != null) {
            return this.parsedFormatInfo;
        }
        var formatInfoBits = 0;
        for (var i = 0; i < 6; i++) {
            formatInfoBits = this.copyBit(i, 8, formatInfoBits);
        }
        formatInfoBits = this.copyBit(7, 8, formatInfoBits);
        formatInfoBits = this.copyBit(8, 8, formatInfoBits);
        formatInfoBits = this.copyBit(8, 7, formatInfoBits);
        for (var j = 5; j >= 0; j--) {
            formatInfoBits = this.copyBit(8, j, formatInfoBits);
        }
        this.parsedFormatInfo = FormatInformation.decodeFormatInformation(formatInfoBits);
        if (this.parsedFormatInfo != null) {
            return this.parsedFormatInfo;
        }
        var dimension = this.bitMatrix.Dimension;
        formatInfoBits = 0;
        var iMin = dimension - 8;
        for (var i = dimension - 1; i >= iMin; i--) {
            formatInfoBits = this.copyBit(i, 8, formatInfoBits);
        }
        for (var j = dimension - 7; j < dimension; j++) {
            formatInfoBits = this.copyBit(8, j, formatInfoBits);
        }
        this.parsedFormatInfo = FormatInformation.decodeFormatInformation(formatInfoBits);
        if (this.parsedFormatInfo != null) {
            return this.parsedFormatInfo;
        }
        throw "Error readFormatInformation";
    };
    BitMatrixParser.prototype.readVersion = function () {
        if (this.parsedVersion != null) {
            return this.parsedVersion;
        }
        var dimension = this.bitMatrix.Dimension;
        var provisionalVersion = (dimension - 17) >> 2;
        if (provisionalVersion <= 6) {
            return Version.getVersionForNumber(provisionalVersion);
        }
        var versionBits = 0;
        var ijMin = dimension - 11;
        for (var j = 5; j >= 0; j--) {
            for (var i = dimension - 9; i >= ijMin; i--) {
                versionBits = this.copyBit(i, j, versionBits);
            }
        }
        this.parsedVersion = Version.decodeVersionInformation(versionBits);
        if (this.parsedVersion != null && this.parsedVersion.DimensionForVersion == dimension) {
            return this.parsedVersion;
        }
        versionBits = 0;
        for (var i = 5; i >= 0; i--) {
            for (var j = dimension - 9; j >= ijMin; j--) {
                versionBits = this.copyBit(i, j, versionBits);
            }
        }
        this.parsedVersion = Version.decodeVersionInformation(versionBits);
        if (this.parsedVersion != null && this.parsedVersion.DimensionForVersion == dimension) {
            return this.parsedVersion;
        }
        throw "Error readVersion";
    };
    BitMatrixParser.prototype.readCodewords = function () {
        var formatInfo = this.readFormatInformation();
        var version = this.readVersion();
        var dataMask = DataMask.forReference(formatInfo.DataMask);
        var dimension = this.bitMatrix.Dimension;
        dataMask.unmaskBitMatrix(this.bitMatrix, dimension);
        var functionPattern = version.buildFunctionPattern();
        var readingUp = true;
        var result = new Array(version.TotalCodewords);
        var resultOffset = 0;
        var currentByte = 0;
        var bitsRead = 0;
        for (var j = dimension - 1; j > 0; j -= 2) {
            if (j == 6) {
                j--;
            }
            for (var count = 0; count < dimension; count++) {
                var i = readingUp ? dimension - 1 - count : count;
                for (var col = 0; col < 2; col++) {
                    if (!functionPattern.get_Renamed(j - col, i)) {
                        bitsRead++;
                        currentByte <<= 1;
                        if (this.bitMatrix.get_Renamed(j - col, i)) {
                            currentByte |= 1;
                        }
                        if (bitsRead == 8) {
                            result[resultOffset++] = currentByte;
                            bitsRead = 0;
                            currentByte = 0;
                        }
                    }
                }
            }
            readingUp = !readingUp;
        }
        if (resultOffset != version.TotalCodewords) {
            throw "Error readCodewords";
        }
        return result;
    };
    return BitMatrixParser;
}());
var DataBlock = /** @class */ (function () {
    function DataBlock(numDataCodewords, codewords) {
        this.numDataCodewords = numDataCodewords;
        this.codewords = codewords;
    }
    Object.defineProperty(DataBlock.prototype, "NumDataCodewords", {
        get: function () {
            return this.numDataCodewords;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataBlock.prototype, "Codewords", {
        get: function () {
            return this.codewords;
        },
        enumerable: true,
        configurable: true
    });
    DataBlock.getDataBlocks = function (rawCodewords, version, ecLevel) {
        if (rawCodewords.length != version.TotalCodewords) {
            throw "ArgumentException";
        }
        var ecBlocks = version.getECBlocksForLevel(ecLevel);
        var totalBlocks = 0;
        var ecBlockArray = ecBlocks.getECBlocks();
        for (var i = 0; i < ecBlockArray.length; i++) {
            totalBlocks += ecBlockArray[i].Count;
        }
        var result = new Array(totalBlocks);
        var numResultBlocks = 0;
        for (var j = 0; j < ecBlockArray.length; j++) {
            var ecBlock = ecBlockArray[j];
            for (var i = 0; i < ecBlock.Count; i++) {
                var numDataCodewords = ecBlock.DataCodewords;
                var numBlockCodewords = ecBlocks.ECCodewordsPerBlock + numDataCodewords;
                result[numResultBlocks++] = new DataBlock(numDataCodewords, new Array(numBlockCodewords));
            }
        }
        var shorterBlocksTotalCodewords = result[0].codewords.length;
        var longerBlocksStartAt = result.length - 1;
        while (longerBlocksStartAt >= 0) {
            var numCodewords = result[longerBlocksStartAt].codewords.length;
            if (numCodewords == shorterBlocksTotalCodewords) {
                break;
            }
            longerBlocksStartAt--;
        }
        longerBlocksStartAt++;
        var shorterBlocksNumDataCodewords = shorterBlocksTotalCodewords - ecBlocks.ECCodewordsPerBlock;
        var rawCodewordsOffset = 0;
        for (var i = 0; i < shorterBlocksNumDataCodewords; i++) {
            for (var j = 0; j < numResultBlocks; j++) {
                result[j].codewords[i] = rawCodewords[rawCodewordsOffset++];
            }
        }
        for (var j = longerBlocksStartAt; j < numResultBlocks; j++) {
            result[j].codewords[shorterBlocksNumDataCodewords] = rawCodewords[rawCodewordsOffset++];
        }
        var max = result[0].codewords.length;
        for (var i = shorterBlocksNumDataCodewords; i < max; i++) {
            for (var j = 0; j < numResultBlocks; j++) {
                var iOffset = j < longerBlocksStartAt ? i : i + 1;
                result[j].codewords[iOffset] = rawCodewords[rawCodewordsOffset++];
            }
        }
        return result;
    };
    return DataBlock;
}());
var QRCodeDataBlockReader = /** @class */ (function () {
    function QRCodeDataBlockReader(blocks, version, numErrorCorrectionCode) {
        this.blockPointer = 0;
        this.bitPointer = 7;
        this.dataLength = 0;
        this.blocks = blocks;
        this.numErrorCorrectionCode = numErrorCorrectionCode;
        if (version <= 9)
            this.dataLengthMode = 0;
        else if (version >= 10 && version <= 26)
            this.dataLengthMode = 1;
        else if (version >= 27 && version <= 40)
            this.dataLengthMode = 2;
    }
    QRCodeDataBlockReader.prototype.getNextBits = function (numBits) {
        var bits = 0;
        if (numBits < this.bitPointer + 1) {
            var mask = 0;
            for (var i = 0; i < numBits; i++) {
                mask += (1 << i);
            }
            mask <<= (this.bitPointer - numBits + 1);
            bits = (this.blocks[this.blockPointer] & mask) >> (this.bitPointer - numBits + 1);
            this.bitPointer -= numBits;
            return bits;
        }
        else if (numBits < this.bitPointer + 1 + 8) {
            var mask1 = 0;
            for (var i = 0; i < this.bitPointer + 1; i++) {
                mask1 += (1 << i);
            }
            bits = (this.blocks[this.blockPointer] & mask1) << (numBits - (this.bitPointer + 1));
            this.blockPointer++;
            bits += ((this.blocks[this.blockPointer]) >> (8 - (numBits - (this.bitPointer + 1))));
            this.bitPointer = this.bitPointer - numBits % 8;
            if (this.bitPointer < 0) {
                this.bitPointer = 8 + this.bitPointer;
            }
            return bits;
        }
        else if (numBits < this.bitPointer + 1 + 16) {
            var mask1 = 0;
            var mask3 = 0;
            for (var i = 0; i < this.bitPointer + 1; i++) {
                mask1 += (1 << i);
            }
            var bitsFirstBlock = (this.blocks[this.blockPointer] & mask1) << (numBits - (this.bitPointer + 1));
            this.blockPointer++;
            var bitsSecondBlock = this.blocks[this.blockPointer] << (numBits - (this.bitPointer + 1 + 8));
            this.blockPointer++;
            for (var i = 0; i < numBits - (this.bitPointer + 1 + 8); i++) {
                mask3 += (1 << i);
            }
            mask3 <<= 8 - (numBits - (this.bitPointer + 1 + 8));
            var bitsThirdBlock = (this.blocks[this.blockPointer] & mask3) >> (8 - (numBits - (this.bitPointer + 1 + 8)));
            bits = bitsFirstBlock + bitsSecondBlock + bitsThirdBlock;
            this.bitPointer = this.bitPointer - (numBits - 8) % 8;
            if (this.bitPointer < 0) {
                this.bitPointer = 8 + this.bitPointer;
            }
            return bits;
        }
        else {
            return 0;
        }
    };
    QRCodeDataBlockReader.prototype.NextMode = function () {
        if ((this.blockPointer > this.blocks.length - this.numErrorCorrectionCode - 2))
            return 0;
        else
            return this.getNextBits(4);
    };
    QRCodeDataBlockReader.prototype.getDataLength = function (modeIndicator) {
        var index = 0;
        while (true) {
            if ((modeIndicator >> index) == 1)
                break;
            index++;
        }
        return this.getNextBits(QRCodeDataBlockReader.sizeOfDataLengthInfo[this.dataLengthMode][index]);
    };
    QRCodeDataBlockReader.prototype.getRomanAndFigureString = function (dataLength) {
        var length = dataLength;
        var intData = 0;
        var strData = "";
        var tableRomanAndFigure = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ', '$', '%', '*', '+', '-', '.', '/', ':');
        do {
            if (length > 1) {
                intData = this.getNextBits(11);
                var firstLetter = Math.floor(intData / 45);
                var secondLetter = intData % 45;
                strData += tableRomanAndFigure[firstLetter];
                strData += tableRomanAndFigure[secondLetter];
                length -= 2;
            }
            else if (length == 1) {
                intData = this.getNextBits(6);
                strData += tableRomanAndFigure[intData];
                length -= 1;
            }
        } while (length > 0);
        return strData;
    };
    QRCodeDataBlockReader.prototype.getFigureString = function (dataLength) {
        var length = dataLength;
        var intData = 0;
        var strData = "";
        do {
            if (length >= 3) {
                intData = this.getNextBits(10);
                if (intData < 100)
                    strData += "0";
                if (intData < 10)
                    strData += "0";
                length -= 3;
            }
            else if (length == 2) {
                intData = this.getNextBits(7);
                if (intData < 10)
                    strData += "0";
                length -= 2;
            }
            else if (length == 1) {
                intData = this.getNextBits(4);
                length -= 1;
            }
            strData += intData;
        } while (length > 0);
        return strData;
    };
    QRCodeDataBlockReader.prototype.get8bitByteArray = function (dataLength) {
        var length = dataLength;
        var intData = 0;
        var output = new Array();
        do {
            intData = this.getNextBits(8);
            output.push(intData);
            length--;
        } while (length > 0);
        return output;
    };
    QRCodeDataBlockReader.prototype.getKanjiString = function (dataLength) {
        var length = dataLength;
        var intData = 0;
        var unicodeString = "";
        do {
            intData = this.getNextBits(13);
            var lowerByte = intData % 0xC0;
            var higherByte = intData / 0xC0;
            var tempWord = (higherByte << 8) + lowerByte;
            var shiftjisWord = 0;
            if (tempWord + 0x8140 <= 0x9FFC) {
                shiftjisWord = tempWord + 0x8140;
            }
            else {
                shiftjisWord = tempWord + 0xC140;
            }
            unicodeString += String.fromCharCode(shiftjisWord);
            length--;
        } while (length > 0);
        return unicodeString;
    };
    Object.defineProperty(QRCodeDataBlockReader.prototype, "DataByte", {
        get: function () {
            var output = new Array();
            var MODE_NUMBER = 1;
            var MODE_ROMAN_AND_NUMBER = 2;
            var MODE_8BIT_BYTE = 4;
            var MODE_KANJI = 8;
            do {
                var mode = this.NextMode();
                if (mode == 0) {
                    if (output.length > 0)
                        break;
                    else
                        throw "Empty data block";
                }
                if (mode != MODE_NUMBER && mode != MODE_ROMAN_AND_NUMBER && mode != MODE_8BIT_BYTE && mode != MODE_KANJI) {
                    throw "Invalid mode: " + mode + " in (block:" + this.blockPointer + " bit:" + this.bitPointer + ")";
                }
                var dataLength = this.getDataLength(mode);
                if (dataLength < 1)
                    throw "Invalid data length: " + dataLength;
                switch (mode) {
                    case MODE_NUMBER:
                        var temp_str = this.getFigureString(dataLength);
                        var ta = new Array(temp_str.length);
                        for (var j = 0; j < temp_str.length; j++)
                            ta[j] = temp_str.charCodeAt(j);
                        output.push(ta);
                        break;
                    case MODE_ROMAN_AND_NUMBER:
                        var temp_str = this.getRomanAndFigureString(dataLength);
                        var ta = new Array(temp_str.length);
                        for (var j = 0; j < temp_str.length; j++)
                            ta[j] = temp_str.charCodeAt(j);
                        output.push(ta);
                        break;
                    case MODE_8BIT_BYTE:
                        var temp_sbyteArray3 = this.get8bitByteArray(dataLength);
                        output.push(temp_sbyteArray3);
                        break;
                    case MODE_KANJI:
                        var temp_str = this.getKanjiString(dataLength);
                        output.push(temp_str);
                        break;
                }
            } while (true);
            return output;
        },
        enumerable: true,
        configurable: true
    });
    return QRCodeDataBlockReader;
}());
QRCodeDataBlockReader.sizeOfDataLengthInfo = [[10, 9, 8, 8], [12, 11, 16, 10], [14, 13, 16, 12]];
var Decoder = /** @class */ (function () {
    function Decoder() {
        this.rsDecoder = new ReedSolomonDecoder(GF256.QR_CODE_FIELD);
        this.decode = function (bits) {
            var parser = new BitMatrixParser(bits);
            var version = parser.readVersion();
            var ecLevel = parser.readFormatInformation().ErrorCorrectionLevel;
            var codewords = parser.readCodewords();
            var dataBlocks = DataBlock.getDataBlocks(codewords, version, ecLevel);
            var totalBytes = 0;
            for (var i = 0; i < dataBlocks.length; i++) {
                totalBytes += dataBlocks[i].NumDataCodewords;
            }
            var resultBytes = new Array(totalBytes);
            var resultOffset = 0;
            for (var j = 0; j < dataBlocks.length; j++) {
                var dataBlock = dataBlocks[j];
                var codewordBytes = dataBlock.Codewords;
                var numDataCodewords = dataBlock.NumDataCodewords;
                this.correctErrors(codewordBytes, numDataCodewords);
                for (var i = 0; i < numDataCodewords; i++) {
                    resultBytes[resultOffset++] = codewordBytes[i];
                }
            }
            var reader = new QRCodeDataBlockReader(resultBytes, version.VersionNumber, ecLevel.Bits);
            return reader;
        };
    }
    Decoder.prototype.correctErrors = function (codewordBytes, numDataCodewords) {
        var numCodewords = codewordBytes.length;
        var codewordsInts = new Array(numCodewords);
        for (var i = 0; i < numCodewords; i++) {
            codewordsInts[i] = codewordBytes[i] & 0xFF;
        }
        var numECCodewords = codewordBytes.length - numDataCodewords;
        try {
            this.rsDecoder.decode(codewordsInts, numECCodewords);
        }
        catch (rse) {
            throw rse;
        }
        for (var i = 0; i < numDataCodewords; i++) {
            codewordBytes[i] = codewordsInts[i];
        }
    };
    return Decoder;
}());
var QRCode = /** @class */ (function () {
    function QRCode() {
        this.debug = false;
        this.maxImgSize = 1024 * 1024;
        this.sizeOfDataLengthInfo = [[10, 9, 8, 8], [12, 11, 16, 10], [14, 13, 16, 12]];
    }
    QRCode.prototype.decode = function (canvas) {
        var context = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.imagedata = context.getImageData(0, 0, this.width, this.height);
        this.result = this.process(context);
        if (this.myCallback != null)
            this.myCallback(this.result);
        return this.result;
    };
    QRCode.prototype.process = function (context) {
        var start = new Date().getTime();
        var image = this.grayScaleToBitmap(this.grayscale());
        if (this.debug) {
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    var point = (x * 4) + (y * this.width * 4);
                    this.imagedata.data[point] = image[x + y * this.width] ? 0 : 0;
                    this.imagedata.data[point + 1] = image[x + y * this.width] ? 0 : 0;
                    this.imagedata.data[point + 2] = image[x + y * this.width] ? 255 : 0;
                }
            }
            context.putImageData(this.imagedata, 0, 0);
        }
        var detector = new Detector(image, this.imagedata, this.width, this.height);
        var qRCodeMatrix = detector.detect();
        if (this.debug)
            context.putImageData(this.imagedata, 0, 0);
        var decoder = new Decoder();
        var reader = decoder.decode(qRCodeMatrix.bits);
        var data = reader.DataByte;
        var str = "";
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].length; j++)
                str += String.fromCharCode(data[i][j]);
        }
        var end = new Date().getTime();
        var time = end - start;
        console.log(time);
        return str;
    };
    QRCode.prototype.grayScaleToBitmap = function (grayScale) {
        var middle = this.getMiddleBrightnessPerArea(grayScale);
        var sqrtNumArea = middle.length;
        var areaWidth = Math.floor(this.width / sqrtNumArea);
        var areaHeight = Math.floor(this.height / sqrtNumArea);
        var bitmap = new Array(this.height * this.width);
        for (var ay = 0; ay < sqrtNumArea; ay++) {
            for (var ax = 0; ax < sqrtNumArea; ax++) {
                for (var dy = 0; dy < areaHeight; dy++) {
                    for (var dx = 0; dx < areaWidth; dx++) {
                        bitmap[areaWidth * ax + dx + (areaHeight * ay + dy) * this.width] = (grayScale[areaWidth * ax + dx + (areaHeight * ay + dy) * this.width] < middle[ax][ay]) ? true : false;
                    }
                }
            }
        }
        return bitmap;
    };
    QRCode.prototype.grayscale = function () {
        var ret = new Array(this.width * this.height);
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                var gray = this.getPixel(x, y);
                ret[x + y * this.width] = gray;
            }
        }
        return ret;
    };
    QRCode.prototype.getPixel = function (x, y) {
        if (this.width < x) {
            throw "point error";
        }
        if (this.height < y) {
            throw "point error";
        }
        var point = (x * 4) + (y * this.width * 4);
        var p = (this.imagedata.data[point] * 33 + this.imagedata.data[point + 1] * 34 + this.imagedata.data[point + 2] * 33) / 100;
        return p;
    };
    QRCode.prototype.getMiddleBrightnessPerArea = function (image) {
        var numSqrtArea = 4;
        var areaWidth = Math.floor(this.width / numSqrtArea);
        var areaHeight = Math.floor(this.height / numSqrtArea);
        var minmax = new Array(numSqrtArea);
        for (var i = 0; i < numSqrtArea; i++) {
            minmax[i] = new Array(numSqrtArea);
            for (var i2 = 0; i2 < numSqrtArea; i2++) {
                minmax[i][i2] = new Array(0, 0);
            }
        }
        for (var ay = 0; ay < numSqrtArea; ay++) {
            for (var ax = 0; ax < numSqrtArea; ax++) {
                minmax[ax][ay][0] = 0xFF;
                for (var dy = 0; dy < areaHeight; dy++) {
                    for (var dx = 0; dx < areaWidth; dx++) {
                        var target = image[areaWidth * ax + dx + (areaHeight * ay + dy) * this.width];
                        if (target < minmax[ax][ay][0])
                            minmax[ax][ay][0] = target;
                        if (target > minmax[ax][ay][1])
                            minmax[ax][ay][1] = target;
                    }
                }
            }
        }
        var middle = new Array(numSqrtArea);
        for (var i3 = 0; i3 < numSqrtArea; i3++) {
            middle[i3] = new Array(numSqrtArea);
        }
        for (var ay = 0; ay < numSqrtArea; ay++) {
            for (var ax = 0; ax < numSqrtArea; ax++) {
                middle[ax][ay] = Math.floor((minmax[ax][ay][0] + minmax[ax][ay][1]) / 2);
            }
        }
        return middle;
    };
    return QRCode;
}());
var QrScannerComponent = /** @class */ (function () {
    function QrScannerComponent(renderer) {
        this.renderer = renderer;
        this.canvasWidth = 640;
        this.canvasHeight = 480;
        this.debug = false;
        this.stopAfterScan = true;
        this.updateTime = 500;
        this.capturedQr = new core.EventEmitter();
        this.foundCameras = new core.EventEmitter();
        this.chooseCamera = new rxjs.Subject();
        this.canvasHidden = true;
    }
    Object.defineProperty(QrScannerComponent.prototype, "isCanvasSupported", {
        get: function () {
            var canvas = this.renderer.createElement('canvas');
            return !!(canvas.getContext && canvas.getContext('2d'));
        },
        enumerable: true,
        configurable: true
    });
    QrScannerComponent.prototype.ngOnInit = function () {
    };
    QrScannerComponent.prototype.ngOnDestroy = function () {
        this.chooseCamera$.unsubscribe();
        this.stopScanning();
    };
    QrScannerComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.debug)
            console.log('[QrScanner] ViewInit, isSupported: ', this.isCanvasSupported);
        if (this.isCanvasSupported) {
            this.gCtx = this.qrCanvas.nativeElement.getContext('2d');
            this.gCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            this.qrCode = new QRCode();
            if (this.debug)
                this.qrCode.debug = true;
            this.qrCode.myCallback = function (decoded) { return _this.QrDecodeCallback(decoded); };
        }
        this.chooseCamera$ = this.chooseCamera.subscribe(function (camera) { return _this.useDevice(camera); });
        this.getMediaDevices().then(function (devices) { return _this.foundCameras.next(devices); });
    };
    QrScannerComponent.prototype.startScanning = function (device) {
        this.useDevice(device);
    };
    QrScannerComponent.prototype.stopScanning = function () {
        if (this.captureTimeout) {
            clearTimeout(this.captureTimeout);
            this.captureTimeout = 0;
        }
        this.canvasHidden = false;
        var stream = this.stream && this.stream.getTracks().length && this.stream;
        if (stream) {
            stream.getTracks().forEach(function (track) { return track.enabled && track.stop(); });
            this.stream = null;
        }
    };
    QrScannerComponent.prototype.getMediaDevices = function () {
        var _this = this;
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices)
            return Promise.resolve([]);
        return navigator.mediaDevices.enumerateDevices()
            .then(function (devices) { return devices; })
            .catch(function (error) {
            if (_this.debug)
                console.warn('Error', error);
            return [];
        });
    };
    QrScannerComponent.prototype.QrDecodeCallback = function (decoded) {
        var _this = this;
        if (this.stopAfterScan) {
            this.stopScanning();
            this.capturedQr.next(decoded);
        }
        else {
            this.capturedQr.next(decoded);
            this.captureTimeout = setTimeout(function () { return _this.captureToCanvas(); }, this.updateTime);
        }
    };
    QrScannerComponent.prototype.captureToCanvas = function () {
        var _this = this;
        try {
            this.gCtx.drawImage(this.videoElement, 0, 0, this.canvasWidth, this.canvasHeight);
            this.qrCode.decode(this.qrCanvas.nativeElement);
        }
        catch (e) {
            if (this.debug)
                console.log('[QrScanner] Thrown', e);
            if (!this.stream)
                return;
            this.captureTimeout = setTimeout(function () { return _this.captureToCanvas(); }, this.updateTime);
        }
    };
    QrScannerComponent.prototype.setStream = function (stream) {
        var _this = this;
        this.canvasHidden = true;
        this.gCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.stream = stream;
        this.videoElement.srcObject = stream;
        this.captureTimeout = setTimeout(function () { return _this.captureToCanvas(); }, this.updateTime);
    };
    QrScannerComponent.prototype.useDevice = function (_device) {
        var _navigator = navigator;
        if (this.captureTimeout) {
            this.stopScanning();
        }
        if (!this.videoElement) {
            this.videoElement = this.renderer.createElement('video');
            this.videoElement.setAttribute('autoplay', 'true');
            this.videoElement.setAttribute('muted', 'true');
            this.renderer.appendChild(this.videoWrapper.nativeElement, this.videoElement);
        }
        var self = this;
        var constraints;
        if (_device) {
            constraints = { audio: false, video: { deviceId: _device.deviceId } };
        }
        else {
            constraints = { audio: false, video: true };
        }
        _navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            self.setStream(stream);
        }).catch(function (err) {
            return self.debug && console.warn('Error', err);
        });
    };
    return QrScannerComponent;
}());
QrScannerComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'qr-scanner',
                styles: [
                    ':host video {height: auto; width: 100%;}',
                    ':host .mirrored { transform: rotateY(180deg); -webkit-transform:rotateY(180deg); -moz-transform:rotateY(180deg); }',
                    ':host {}'
                ],
                template: "\n        <ng-container [ngSwitch]=\"isCanvasSupported\">\n            <ng-container *ngSwitchDefault>\n                <canvas #qrCanvas [hidden]=\"canvasHidden\" [width]=\"canvasWidth\" [height]=\"canvasHeight\"></canvas>\n                <div #videoWrapper [style.width]=\"canvasWidth\" [style.height]=\"canvasHeight\"></div>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"false\">\n                <p>\n                    You are using an <strong>outdated</strong> browser.\n                    Please <a href=\"http://browsehappy.com/\">upgrade your browser</a> to improve your experience.\n                </p>\n            </ng-container>\n        </ng-container>"
            },] },
];
QrScannerComponent.ctorParameters = function () { return [
    { type: core.Renderer2, },
]; };
QrScannerComponent.propDecorators = {
    "canvasWidth": [{ type: core.Input },],
    "canvasHeight": [{ type: core.Input },],
    "debug": [{ type: core.Input },],
    "stopAfterScan": [{ type: core.Input },],
    "updateTime": [{ type: core.Input },],
    "capturedQr": [{ type: core.Output },],
    "foundCameras": [{ type: core.Output },],
    "videoWrapper": [{ type: core.ViewChild, args: ['videoWrapper',] },],
    "qrCanvas": [{ type: core.ViewChild, args: ['qrCanvas',] },],
    "chooseCamera": [{ type: core.Input },],
};
var NgQrScannerModule = /** @class */ (function () {
    function NgQrScannerModule() {
    }
    NgQrScannerModule.forRoot = function () {
        return {
            ngModule: NgQrScannerModule
        };
    };
    return NgQrScannerModule;
}());
NgQrScannerModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule
                ],
                declarations: [QrScannerComponent],
                exports: [QrScannerComponent]
            },] },
];
NgQrScannerModule.ctorParameters = function () { return []; };

exports.NgQrScannerModule = NgQrScannerModule;
exports.QrScannerComponent = QrScannerComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular2-qrscanner.umd.js.map
