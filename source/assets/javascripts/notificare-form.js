/**
 * @fileOverview Class to display, parse, validate and submit forms
 * @author Joris Verbogt <joris@notifica.re>
 */

if (typeof jQuery === "undefined") { throw new Error("NotificareForm requires jQuery") }

(function($) {

    'use strict';

    /**
     * @param element
     * @param options
     * @constructor
     */
    function NotificareForm(element, options) {
        this.element = $(element);
        this.formElements = {};
        this._idCounter = 0;
        options = options || {};
        options.url = options.url || Config.dashboardAPI + '/form';
        options.redirect = options.redirect || false;
        options.trackUrl = options.trackUrl || '/forms/' + options.type;
        options.trackTitle = options.trackTitle || options.trackUrl;
        options.spinnerClass = options.spinnerClass || 'glyphicon glyphicon-refresh icon-spinner';
        options.formGroupClass = options.formGroupClass || 'form-group';
        options.formControlClass = options.formControlClass || 'form-control';
        options.controlLabelClass = options.controlLabelClass || 'control-label';
        options.successAlertClass = options.successAlertClass || 'alert alert-success';
        options.errorAlertClass = options.errorAlertClass || 'alert alert-danger';
        options.buttonClass = options.buttonClass || 'btn btn-primary btn-lg';
        this.options = options;

        this._spinnerElement = $('<span />', {class: this.options.spinnerClass}).hide();
        this._successAlertElement = $('<div />', {role: 'alert', class: this.options.successAlertClass}).hide();
        this._errorAlertElement = $('<div />', {role: 'alert', class: this.options.errorAlertClass}).hide();
        this.element.append(this._successAlertElement).append(this._errorAlertElement);
        this._loadForm(function(err, data) {
            if (err) {
                this.displayError(err);
            } else {
                this.formData = data;
                this._buildForm();
            }
        }.bind(this));
        this.element.on("submit", this.onSubmit.bind(this));
    }

    /**
     * Clear all errors from the UI
     */
    NotificareForm.prototype.clearErrors = function() {
        $.each(this.formElements, function(key, formElement) {
            formElement.parent('div').removeClass('has-error');
        });
        this._errorAlertElement.hide();
        this._successAlertElement.hide();
    };

    /**
     * Generate a unique id for a form element
     * @param prefix
     * @returns {string}
     */
    NotificareForm.prototype.getUniqueId = function(prefix) {
        return 'uniqleads-form-' + prefix + '-' + this._idCounter++;
    };

    /**
     * Display an error alert with error message. If data contains field names, highlight those fields
     * @param err
     * @param data
     */
    NotificareForm.prototype.displayError = function(err, data) {
        this._errorAlertElement.text(err.message).show();
        $.each(data, function(key, error) {
            if (this.formElements[key]) {
                this.formElements[key].parent('div').addClass('has-error');
            }
        }.bind(this));
    };

    /**
     * Display a success alert
     * @param message
     */
    NotificareForm.prototype.displaySuccess = function(message) {
        this._errorAlertElement.hide();
        this._successAlertElement.text(message).show();
    };

    /**
     * Start a progress indicator, disable the form
     */
    NotificareForm.prototype.startProgress = function() {
        this.element.attr('disabled', true);
        this._spinnerElement.show();
    };

    /**
     * Reenable form, stop progress indicator
     */
    NotificareForm.prototype.stopProgress = function() {
        this.element.attr('disabled', false);
        this._spinnerElement.hide();
    };

    /**
     * Validate the form, populate a data object
     * @param done callback function
     * @private
     */
    NotificareForm.prototype._validateForm = function(done) {
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
    NotificareForm.prototype._buildForm = function() {
        $.each(this.formData.fields, function(index, field) {
            var groupElement, formElement, labelElement;
            var id = field.id || this.getUniqueId(field.name);
            if (field.type == 'text') {
                groupElement = $('<div />', {class: this.options.formGroupClass});
                labelElement = $('<label />', {class: this.options.controlLabelClass, for: id}).text(field.label);
                formElement = $('<input />', {id: id, class: this.options.formControlClass, type: 'text', name: field.name});
                if (field.value) {
                    formElement.attr('value', field.value);
                } else if (this.options.values && this.options.values[field.name]) {
                    formElement.attr('value', this.options.values[field.name]);
                }

                groupElement.append(labelElement).append(formElement)
                this.element.append(groupElement);
            } else if (field.type == 'textarea') {
                groupElement = $('<div />', {class: this.options.formGroupClass});
                labelElement = $('<label />', {class: this.options.controlLabelClass, for: id}).text(field.label);
                formElement = $('<textarea />', {id: id, class: this.options.formControlClass, placeHolder: field.placeHolder, name: field.name});
                if (field.value) {
                    formElement.text(field.value);
                } else if (this.options.values && this.options.values[field.name]) {
                    formElement.text(this.options.values[field.name]);
                }

                groupElement.append(labelElement).append(formElement)
                this.element.append(groupElement);
            } else if (field.type == 'select') {
                groupElement = $('<div />', {class: this.options.formGroupClass});
                labelElement = $('<label />', {class: this.options.controlLabelClass, for: id}).text(field.label);
                formElement = $('<select />', {id: id, class: this.options.formControlClass, placeHolder: field.placeHolder, name: field.name});
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
                        } else if (this.options.values && this.options.values[field.name] && this.options.values[field.name] == optionElement.attr('value')) {
                            optionElement.attr("selected", true);
                        }

                        formElement.append(optionElement);
                    }.bind(this));
                }
                groupElement.append(labelElement).append(formElement);
                this.element.append(groupElement);
            } else if (field.type == 'hidden') {
                formElement = $('<input />', {id: id, name: field.name, type: 'hidden'});
                if (field.value) {
                    formElement.attr('value', field.value);
                } else if (this.options.values && this.options.values[field.name]) {
                    formElement.attr('value', this.options.values[field.name]);
                }
                this.element.append(formElement);
            }
            this.formElements[field.name] = formElement;
        }.bind(this));
        this.element.append($('<button />', {type: 'submit', class: this.options.buttonClass}).append(this._spinnerElement).append(this.formData.button_text));
        $('body').formatElements();
    };

    /**
     * Load form definitions from API
     * @param done
     * @private
     */
    NotificareForm.prototype._loadForm = function(done) {
        var request = $.ajax({
            url: this.options.url + '/' + this.options.type,
            type: "GET",
            dataType: "json"
        });

        request.done(function(data) {
            done(null, data);
        });

        request.fail(function(jqXHR, textStatus) {
            done(new Error('could not load form definition'));
        });

    };

    /**
     * Track successful submission with GA
     * @private
     */
    NotificareForm.prototype._trackSuccess = function() {
        if (typeof ga == 'function') {
            ga('send', 'pageview', {page: this.options.trackUrl, title: this.options.trackTitle});
        }
    };

    /**
     * Validate and submit the form
     * @param event
     */
    NotificareForm.prototype.onSubmit = function(event) {
        event.preventDefault();
        this.clearErrors();
        this.startProgress();
        this._spinnerElement.show();
        this._validateForm(function(valid, data) {
            if (!valid) {
                this.stopProgress();
                this.displayError(new Error('please fill in all required information'), data);
            } else {
                if (this.options.redirect) {
                    data.redirect = this.options.redirect;
                }
                var request = $.ajax({
                    url: this.options.url + '/' + this.options.type,
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
                        this.displaySuccess(data.message);
                    }
                }.bind(this));

                request.fail(function(jqXHR, textStatus) {
                    this.stopProgress();
                    this.displayError(new Error('failed to process form data'));
                }.bind(this));
            }
        }.bind(this));
    };

    window.NotificareForm = NotificareForm;

}(jQuery));