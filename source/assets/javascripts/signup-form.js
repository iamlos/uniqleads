/**
 * @fileOverview Class to display, parse, validate and submit signup form
 * @author Joris Verbogt <joris@notifica.re>
 */

if (typeof jQuery === "undefined") { throw new Error("SignupForm requires jQuery") }

(function($) {

    'use strict';

    /**
     * @param element
     * @param options
     * @constructor
     */
    function SignupForm(element, options) {
        this.element = $(element);
        this.formElements = {};
        this._idCounter = 0;
        options = options || {};
        options.url = options.url || Config.dashboardAPI + '/accounts/trial';
        options.redirect = options.redirect || false;
        options.trackUrl = options.trackUrl || '/forms/signup-for-trial';
        options.trackTitle = options.trackTitle || options.trackUrl;
        options.spinnerClass = options.spinnerClass || 'glyphicon glyphicon-refresh icon-spinner';
        options.formGroupClass = options.formGroupClass || 'form-group';
        options.formControlClass = options.formControlClass || 'form-control';
        options.controlLabelClass = options.controlLabelClass || 'control-label sr-only';
        options.successAlertClass = options.successAlertClass || 'alert-naked alert-success';
        options.errorAlertClass = options.errorAlertClass || 'alert-naked alert-danger';
        options.buttonClass = options.buttonClass || 'btn btn-primary btn-lg';
        this.options = options;

        this._spinnerElement = $('<span />', {class: this.options.spinnerClass}).hide();
        this._successAlertElement = $('<div />', {role: 'alert', class: this.options.successAlertClass}).hide();
        this._errorAlertElement = $('<div />', {role: 'alert', class: this.options.errorAlertClass}).hide();
        this.element.append(this._successAlertElement).append(this._errorAlertElement);
        this.formData = {
            button_text: options.buttonText,
            fields: [{
                name: 'email',
                type: 'text',
                label: 'email',
                placeHolder: 'email address',
                validator: '^[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\\.)+[A-Za-z]{2,4}$',
                required: true
            }, {
                name: 'create_demo',
                type: 'hidden',
                value: '1'
            }]};
        this._buildForm();
        this.element.on("submit", this.onSubmit.bind(this));
    }

    SignupForm.prototype.getUniqueId = function(prefix) {
        return 'signup-form-' + prefix + '-' + this._idCounter++;
    };

    SignupForm.prototype.clearErrors = function() {
        $.each(this.formElements, function(key, formElement) {
            formElement.parent('div').removeClass('has-error');
        });
        this._errorAlertElement.hide();
        this._successAlertElement.hide();
    };

    /**
     * Display an error alert with error message. If data contains field names, highlight those fields
     * @param err
     * @param data
     */
    SignupForm.prototype.displayError = function(err, data) {
        this._errorAlertElement.text(err.message).show();
        if (data) {
            $.each(data, function(key, error) {
                if (this.formElements[key]) {
                    this.formElements[key].parent('div').addClass('has-error');
                }
            }.bind(this));
        }
        setTimeout(function(){
            this._errorAlertElement.fadeOut();
        }.bind(this), 5000);
    };

    /**
     * Display a success alert
     * @param message
     */
    SignupForm.prototype.displaySuccess = function(message) {
        this._errorAlertElement.hide();
        this._successAlertElement.text(message).show();
        setTimeout(function(){
            this._successAlertElement.fadeOut();
        }.bind(this), 5000);
    };

    /**
     * Start a progress indicator, disable the form
     */
    SignupForm.prototype.startProgress = function() {
        this.element.attr('disabled', true);
        this._spinnerElement.show();
    };

    /**
     * Reenable form, stop progress indicator
     */
    SignupForm.prototype.stopProgress = function() {
        this.element.attr('disabled', false);
        this._spinnerElement.hide();
    };

    /**
     * Validate the field
     * @param field
     * @param value(optional, defaults to field value)
     * @private
     */
    SignupForm.prototype._validateField = function(field, value) {
        var regexp = new RegExp(field.validator);
        if (!value) {
            value = this.formElements[field.name].val();
        }
        return regexp.test(value);
    };

    /**
     * Validate the form, populate a data object
     * @param done callback function
     * @private
     */
    SignupForm.prototype._validateForm = function(done) {
        var valid = true;
        var errors = {};
        var data = {};
        $.each(this.formData.fields, function(index, field) {
            var value = this.formElements[field.name].val();
            if (value) {
                value = value.trim();
            }
            if (field.required && !value) {
                valid = false;
                errors[field.name] = 'required';
            } else if (field.validator && value && !this._validateField(field, value)) {
                valid = false;
                errors[field.name] = 'invalid';
            } else {
                data[field.name] = value;
            }
        }.bind(this));
        if (!valid) {
            done(valid, errors);
        } else {
            done(valid, data);
        }
    };

    /**
     * Build the form
     * @private
     */
    SignupForm.prototype._buildForm = function() {
        $.each(this.formData.fields, function(index, field) {
            var groupElement, formElement, labelElement;
            var id = field.id || this.getUniqueId(field.name);
            if (field.type == 'text') {
                groupElement = $('<div />', {class: this.options.formGroupClass});
                labelElement = $('<label />', {class: this.options.controlLabelClass, for: id}).text(field.label);
                formElement = $('<input />', {id: id, class: this.options.formControlClass, type: 'text', placeHolder: field.placeHolder, name: field.name});
                if (field.value) {
                    formElement.attr('value', field.value);
                }

                groupElement.append(labelElement).append(formElement)
                this.element.append(groupElement);
            } else if (field.type == 'textarea') {
                groupElement = $('<div />', {class: this.options.formGroupClass});
                labelElement = $('<label />', {class: this.options.controlLabelClass, for: id}).text(field.label);
                formElement = $('<textarea />', {id: id, class: this.options.formControlClass, placeHolder: field.placeHolder, name: field.name});
                if (field.value) {
                    formElement.text(field.value);
                }

                groupElement.append(labelElement).append(formElement)
                this.element.append(groupElement);
            } else if (field.type == 'select') {
                groupElement = $('<div />', {class: this.options.formGroupClass});
                labelElement = $('<label />', {class: this.options.controlLabelClass, for: id}).text(field.label);
                formElement = $('<select />', {id: id, class: this.options.formControlClass, name: field.name});
                if (field.options) {
                    $.each(field.options, function(index, option) {
                        var optionElement = $('<option />');
                        if (typeof option == 'string') {
                            if (option == '') {
                                optionElement.attr('value', option);
                                optionElement.text('---');
                            } else {
                                optionElement.attr('value', option);
                                optionElement.text(option);
                            }
                        } else {
                            optionElement.attr('value', option.value);
                            optionElement.text(option.label);
                        }
                        if (field.value && field.value == optionElement.attr('value')) {
                            optionElement.attr("selected", true);
                        }
                        formElement.append(optionElement);
                    });
                }
                groupElement.append(labelElement).append(formElement);
                this.element.append(groupElement);
            } else if (field.type == 'hidden') {
                formElement = $('<input />', {id: id, name: field.name, type: 'hidden'});
                if (field.value) {
                    formElement.attr('value', field.value);
                }
                this.element.append(formElement);
            }
            this.formElements[field.name] = formElement;
        }.bind(this));
        this.element.append($('<button />', {type: 'submit', class: this.options.buttonClass}).append(this._spinnerElement).append(this.formData.button_text));
    };

    /**
     * Track successful submission with GA
     * @private
     */
    SignupForm.prototype._trackSuccess = function() {
        if (typeof ga == 'function') {
            ga('send', 'pageview', {page: this.options.trackUrl, title: this.options.trackTitle});
        }
    };

    /**
     * Validate and submit the form
     * @param event
     */
    SignupForm.prototype.onSubmit = function(event) {

        event.preventDefault();
        this.clearErrors();
        this.startProgress();
        this._spinnerElement.show();
        this._validateForm(function(valid, data) {
            if (!valid) {
                this.stopProgress();
                this.displayError(new Error('please fill in a valid email address'), data);
            } else {
                if (this.options.redirect) {
                    data.redirect = this.options.redirect;
                }
                var request = $.ajax({
                    url: this.options.url,
                    type: "POST",
                    data: JSON.stringify(data),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json"
                });
                request.done(function(data) {
                    this.stopProgress();
                    if (data.redirect) {
                        window.location = data.redirect;
                    } else {
                        this._trackSuccess();
                        this.displaySuccess("Thank you. Check your inbox for instructions.");
                        $('.signup-form')[0].reset();
                    }
                }.bind(this));

                request.fail(function(jqXHR, textStatus) {
                    this.stopProgress();
                    var error = "oops, there was some unexpected error";
                    if (jqXHR.responseJSON && jqXHR.responseJSON.errors) {
                        error = jqXHR.responseJSON.errors;
                    }
                    this.displayError(new Error(error));
                }.bind(this));
            }
        }.bind(this));
    };

    window.SignupForm = SignupForm;

}(jQuery));