 /// overall label, labels and ids
// this.placeTypesField = createCheckboxField('Place Type(s)', ['Historical', 'Religious', 'Culture', 'Nature', 'Natural Wonders', 'Wildlife'], ['checkboxHistorical', 'checkboxReligious', 'checkboxCulture', 'checkboxNature', 'checkboxNaturalWonders', 'checkboxWildlife'], 'type[]');
function CheckboxField(overallLabel, labels, ids, tooltip = null) {
    this.checkboxFieldContainer = document.createElement('div');
    this.checkboxFieldContainer.classList.add('form-group');



    this.mainLabel = document.createElement('label');
    this.mainLabel.innerHTML = overallLabel;

    this.mainLabel.title = tooltip;



    this.checkboxFieldContainer.appendChild(this.mainLabel);

    for (var i = 0; i < labels.length; i++) {
        var checkbox = createSingleCheckbox(labels[i], ids[i]);
        this.checkboxFieldContainer.appendChild(checkbox);
    }

    if (tooltip != null) {
        // checkbox.setAttribute('title', tooltip);

        this.checkboxFieldContainer.title = 'tooltip';
    }
}

CheckboxField.prototype.getElement = function() {
    return this.checkboxFieldContainer;
}

CheckboxField.prototype.clear = function() {
    $(this.checkboxFieldContainer).find('input').prop("checked", false);
};