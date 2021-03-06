/* https://github.com/colmeye */ class Validation {
  constructor(t) {
    (this.form = $("#" + t)),
      (this.submitButton = $(this.form).find('input[type="submit"]')),
      (this.submitButtonText = this.submitButton.val()),
      (this.inputLog = []),
      (this.validC = "is-valid"),
      (this.invalidC = "is-invalid"),
      this.checkAll();
  }
  requireText(t, s, i, e, a) {
    let h = $("#" + t),
      r = "";
    return (
      this.createAsterisk(h),
      this.inputLog.push(["requireText", t, s, i, e, a]),
      $(h).on("input focus", h, () => {
        (r = ""),
          (r += this.lengthCheck(h, s, i)),
          (r += this.illegalCharCheck(h, e)),
          this.showWarning(h, t, r);
      }),
      $(h).on("input", h, () => {
        this.submitDisabled(!1, this.submitButtonText);
      }),
      $(h).on("focusout", h, () => {
        (r += this.necessaryCharCheck(h, a)),
          this.showWarning(h, t, r),
          this.removeValid(h);
      }),
      r
    );
  }
  requireEmail(t, s, i, e, a) {
    let h = $("#" + t),
      r = "";
    return (
      this.createAsterisk(h),
      this.inputLog.push(["requireEmail", t, s, i, e, a]),
      $(h).on("input focus", h, () => {
        (r = ""),
          (r += this.lengthCheck(h, s, i)),
          (r += this.illegalCharCheck(h, e)),
          this.showWarning(h, t, r);
      }),
      $(h).on("input", h, () => {
        this.submitDisabled(!1, this.submitButtonText);
      }),
      $(h).on("focusout", h, () => {
        (r += this.necessaryCharCheck(h, a)),
          (r += this.emailCheck(h)),
          this.showWarning(h, t, r),
          this.removeValid(h);
      }),
      r
    );
  }
  registerPassword(t, s, i, e, a, h) {
    let r = $("#" + t),
      n = $("#" + h),
      l = "",
      c = "";
    return (
      this.createAsterisk(r),
      this.createAsterisk(n),
      this.inputLog.push(["registerPassword", t, s, i, e, a, h]),
      $(r).on("input focus", r, () => {
        (l = ""),
          (l += this.lengthCheck(r, s, i)),
          (l += this.illegalCharCheck(r, e)),
          this.showWarning(r, t, l),
          (c = ""),
          (c += this.passwordMatchCheck(r, n)),
          this.showWarning(n, h, c);
      }),
      $(r).on("input", r, () => {
        this.submitDisabled(!1, this.submitButtonText);
      }),
      $(r).on("focusout", r, () => {
        (l += this.necessaryCharCheck(r, a)),
          (l += this.capitalCheck(r)),
          (l += this.numberCheck(r)),
          (l += this.specialCharCheck(r)),
          this.showWarning(r, t, l),
          this.removeValid(r),
          this.removeValid(n);
      }),
      $(n).on("input focus", n, () => {
        (c = ""),
          (c += this.passwordMatchCheck(r, n)),
          this.showWarning(n, h, c);
      }),
      $(n).on("input", r, () => {
        this.submitDisabled(!1, this.submitButtonText);
      }),
      $(n).on("focusout", n, () => {
        this.removeValid(n);
      }),
      l
    );
  }
  lengthCheck(t, s, i) {
    return t.val().length <= s
      ? "Tiene que tener como m??nimo " + ++s + " car??cteres. "
      : t.val().length >= i
      ? "El n??mero m??ximo de car??cteres es de  " + i 
      : "";
  }
  illegalCharCheck(t, s) {
    let i = "";
    return (
      $(s).each(function () {
        t.val().indexOf(this) >= 0 &&
          (0 == !this.trim().length ? (i += " " + this) : (i += " spaces"));
      }),
      "" === i ? "" : "Cannot use:" + i + ". "
    );
  }
  necessaryCharCheck(t, s) {
    let i = "";
    return (
      $(s).each(function () {
        t.val().indexOf(this) >= 0 || (i += " " + this);
      }),
      "" === i ? "" : "Must contain:" + i + ". "
    );
  }
  numberCheck(t) {
    return t.val().match(/\d/) ? "" : "Debe contener un n??mero. ";
  }
  specialCharCheck(t) {
    return t.val().match(/\W|_/g) ? "" : "Debe contener un car??cter especial. ";
  }
  capitalCheck(t) {
    return t.val().match(/[A-Z]+/) ? "" : "Debe contener al menos una may??scula ";
  }
  passwordMatchCheck(t, s) {
    return t.val() === s.val() ? "" : "Passwords no coincidentes. ";
  }
  emailCheck(t) {
    return t.val().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      ? ""
      : "No es un formato v??lido de email";
  }
  submitDisabled(t, s) {
    $(this.submitButton).prop("disabled", t), $(this.submitButton).val(s);
  }
  checkAll() {
    $(this.form).submit((t) => {
      $(this.inputLog).each((s) => {
        let i = "",
          e = "",
          a = this.inputLog[s],
          h = a[1],
          r = $("#" + h),
          n = a[2],
          l = a[3],
          c = a[4],
          o = a[5];
        if ("registerPassword" === a[0])
          var u = a[6],
            C = $("#" + u);
        (i = ""),
          (i += this.lengthCheck(r, n, l)),
          (i += this.illegalCharCheck(r, c)),
          (i += this.necessaryCharCheck(r, o)),
          "requireEmail" === a[0] && (i += this.emailCheck(r)),
          "registerPassword" === a[0] &&
            ((i += this.capitalCheck(r)),
            (i += this.numberCheck(r)),
            (i += this.specialCharCheck(r)),
            (e += this.passwordMatchCheck(r, C))),
          i &&
            (this.showWarning(r, h, i),
            this.submitDisabled(!0, "Error, por favor verifica los datos"),
            t.preventDefault()),
          e &&
            (this.showWarning(C, u, e),
            this.submitDisabled(!0, "Error, por favor verifica los datos"),
            t.preventDefault());
      });
    });
  }
  showWarning(t, s, i) {
    i
      ? (this.generateFeedback(t, s, "invalid-feedback", i),
        this.makeInvalid(t))
      : (this.generateFeedback(t, s, "", ""), this.makeValid(t));
  }
  makeValid(t) {
    t.hasClass(this.validC) || t.addClass(this.validC),
      t.hasClass(this.invalidC) && t.removeClass(this.invalidC);
  }
  removeValid(t) {
    t.hasClass(this.validC) && t.removeClass(this.validC);
  }
  makeInvalid(t) {
    t.hasClass(this.invalidC) || t.addClass(this.invalidC),
      t.hasClass(this.validC) && t.removeClass(this.validC);
  }
  createAsterisk(t) {
    $("<span class='text-danger'>*</span>").insertBefore(t);
  }
  generateFeedback(t, s, i, e) {
    $("#" + s + "-feedback").remove(),
      $(
        '<div id="' + s + '-feedback" class="' + i + '">' + e + "</div>"
      ).insertAfter(t);
  }
}
