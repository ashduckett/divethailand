function SelectField(id, labelText, options, tooltip = null) {
    this.div = document.createElement('div');
    this.div.classList.add('form-group');


    
    this.label = document.createElement('label');
    this.label.classList.add('selectBoxLabelContainer');
    this.label.innerHTML = labelText;

    this.select = document.createElement('select');
    this.select.classList.add('customSelectBox');
    this.select.id = id;
    this.select.classList.add('adminDropdown');
    this.select.classList.add('form-control');

    if (tooltip !== null) {
        this.label.title = tooltip;
    }

    for (var i = 0; i < options.length; i++) {
        var option = document.createElement('option');  
        option.value = options[i];  
        option.innerText = options[i];
        this.select.appendChild(option);
    }

    this.div.appendChild(this.label);
    this.div.appendChild(this.select);
}

SelectField.prototype.getElement = function() {
    return this.div;
}

SelectField.prototype.getSelectedText = function() {
    return this.select.options[this.select.selectedIndex].innerHTML;
};

SelectField.prototype.getSelectedIndex = function() {
    return this.select.selectedIndex;
};

SelectField.prototype.setValue = function(value) {
    this.select.value = value;
};

SelectField.prototype.getControl = function() {
    return this.select;
};