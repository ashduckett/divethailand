function TextAreaField(id, labelText, tooltip) {
    this.textAreaContainer = document.createElement('div');
    this.textAreaContainer.classList.add('form-group');

    this.textAreaLabel = document.createElement('label');
    this.textAreaLabel.innerHTML = labelText;


    this.textArea = document.createElement('textarea');
    this.textArea.id = id;
    this.textArea.classList.add('form-control');

    if (tooltip !== null) {
        this.textAreaLabel.title = tooltip;
    }

    this.textAreaContainer.appendChild(this.textAreaLabel);
    this.textAreaContainer.appendChild(this.textArea);
}

TextAreaField.prototype.getElement = function() {
    return this.textAreaContainer;
}

TextAreaField.prototype.setText = function(text) {
    this.textArea.value = text;
};

TextAreaField.prototype.getText = function(text) {
    return this.textArea.value;
};

TextAreaField.prototype.isEmpty = function() {
    return this.textArea.value.trim() == '';
};
