function TextField(id, labelText, tooltip = null) {
    this.textFieldContainer = document.createElement('div');
    this.textFieldContainer.classList.add('form-group');
    
    this.textField = document.createElement('input');
    this.textField.classList.add('form-control');
    this.textField.type = 'text';
    this.textField.id = id;

    

    this.textFieldLabel = document.createElement('label');
    this.textFieldLabel.innerHTML = labelText;

    if (tooltip !== null) {
        this.textFieldLabel.setAttribute('title', tooltip);
    }


    this.textFieldContainer.appendChild(this.textFieldLabel);
    this.textFieldContainer.appendChild(this.textField);
};

TextField.prototype.getElement = function() {
    return this.textFieldContainer;
};

TextField.prototype.getText = function() {
    return this.textField.value.trim();
};

TextField.prototype.setText = function(text) {
    this.textField.value = text == null ? '' : text.toString().trim();
};

TextField.prototype.isEmpty = function() {
    return this.textField.value.trim() == '';
};