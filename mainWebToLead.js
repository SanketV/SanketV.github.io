$(document).ready(function () {

    $("#qualtricsFrm").validate({
        rules: {
            first_name: "required",
            last_name: "required",
            email: {
                required: true,
                emailValidator: true,
                emailWhitelistedDomain: true
            },
            company: "required",
            city: "required",
            state: "required",
            industry: "required"
        },
        messages: {
            first_name: "Please enter your firstname",
            last_name: "Please enter your lastname",
            email: {
                required: "Please enter your email. We do not support public domain emails. e.g. gmail, yahoo and hotmail."
            },
            company: "Please enter your company name",
            city: "Please enter your city name",
            state: "Please enter your state name",
            industry: "Please select your industry"
        },
        errorElement: "em",
        errorPlacement: function (error, element) {
            // Add the `help-block` class to the error element
            error.addClass("help-block");

            // Add `has-feedback` class to the parent div.form-group
            // in order to add icons to inputs
            element.parents(".col-sm-5").addClass("has-feedback");

            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.parent("label"));
            } else {
                error.insertAfter(element);
            }

            // Add the span element, if doesn't exists, and apply the icon classes to it.
            if (!element.next("span")[0]) {
                $("<span class='glyphicon glyphicon-remove form-control-feedback'></span>")
                    .insertAfter(element);
            }
        },
        success: function (label, element) {
            // Add the span element, if doesn't exists, and apply the icon classes to it.
            if (!$(element).next("span")[0]) {
                $("<span class='glyphicon glyphicon-ok form-control-feedback'></span>").insertAfter(
                    $(element));
            }
        },
        highlight: function (element, errorClass, validClass) {
            $(element).parents(".col-sm-5").addClass("has-error").removeClass("has-success");
            $(element).next("span").addClass("glyphicon-remove").removeClass("glyphicon-ok");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parents(".col-sm-5").addClass("has-success").removeClass("has-error");
            $(element).next("span").addClass("glyphicon-ok").removeClass("glyphicon-remove");
        }
    });

    jQuery.validator.addMethod("emailValidator", function (value, element) {
        console.log('• email validator •');
        return this.optional(element) ||
            /^([A-Za-z0-9_\-\.]){1,}\@([A-Za-z0-9_\-\.]){1,}\.([A-Za-z]{2,4})$/
            .test(value);

    }, "Entered email is not correct.");

    jQuery.validator.addMethod("emailWhitelistedDomain", function (value, element) {
        console.log('email whitelisted domain');
        return this.optional(element) ||
            // /^([\w-.]+@(?!gmail\.com)(?!yahoo\.com)(?!hotmail\.com)([\w-]+.)+[\w-]{2,4})?$/
            /^([A-Za-z0-9_\-\.]){1,}\@(?!gmail\.com)(?!yahoo\.com)(?!hotmail\.com)([A-Za-z0-9_\-\.]){1,}\.([A-Za-z]{2,4})$/
            .test(value);

    }, "Just to reiterate public domain emails are not allowed. i.e. yahoo, hotmail and gmail.");
});