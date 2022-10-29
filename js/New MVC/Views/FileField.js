function FileField(id, labelText, tooltip = null) {
    this.overallContainer = document.createElement('div');
    this.overallContainer.classList.add('form-group');

    this.fileFieldContainer = document.createElement('div');
    this.fileFieldContainer.classList.add('fieldRow');
    this.fileFieldContainer.classList.add('custom-file');
    this.fileFieldContainer.classList.add('form-group');
    // accept="image/*
    this.fileField = document.createElement('input');
    this.fileField.type = 'file';
    this.fileField.id = id;
    this.fileField.accept = 'image/*';
    
    this.fileField.classList.add('custom-file-input');


    this.fileFieldLabelText = document.createElement('span');
    this.fileFieldLabelText.innerHTML = 'Click to Upload';

   


    // This is the label that is part of the control
    this.fileFieldLabel = document.createElement('label');




    this.fileFieldLabel.classList.add('fieldLabel');
    this.fileFieldLabel.classList.add('custom-file-label');
    //this.fileFieldLabel.innerHTML = 'Click to Upload';
    this.fileFieldLabel.append(this.fileFieldLabelText);

    // This is the label above the control.
    this.controlLabel = document.createElement('label');
    this.controlLabel.innerHTML = labelText;

    if (tooltip !== null) {
        this.controlLabel.setAttribute('title', tooltip);
    }

    this.fileFieldLabel.append(this.fileField);

    //this.fileFieldContainer.appendChild(this.controlLabel);
    this.fileFieldContainer.appendChild(this.fileFieldLabel);

    this.overallContainer.appendChild(this.controlLabel);
    this.overallContainer.appendChild(this.fileFieldContainer);


    

}


FileField.prototype.getElement = function() {
    return this.overallContainer;
};

FileField.prototype.hasSelectedFile = function() {
    return !($(this.fileField).get(0).files.length == 0 && this.fileFieldLabelText.innerHTML == 'Click to Upload');
};

FileField.prototype.getSelectedPath = function() {
    //return this.fileField.value !== '' ? this.fileField.value : this.fileFieldLabelText.innerHTML !== 'Click to Upload' ? this.fileFieldLabelText.innerHTML : '';

    return this.fileFieldLabelText.innerHTML !== 'Click to Upload' ? this.fileFieldLabelText.innerHTML : null;
};

FileField.prototype.clearValue = function() {
    this.fileField.value = '';
    this.fileFieldLabelText.innerHTML = 'Click to Upload';
};

FileField.prototype.setSelectedPath = function(path) {
    path = path == null ? 'Click to Upload' : path;
    this.fileFieldLabelText.innerHTML = path;
};

FileField.prototype.getSelectedFile = function() {
    return $(this.fileField).get(0).files[0];
};

FileField.prototype.selectedFileLabelEmpty = function() {
    return this.fileFieldLabelText.innerHTML === 'Click to Upload';
};

FileField.prototype.getLabelText = function() {
    return this.fileFieldLabelText.innerHTML;
};

FileField.prototype.getFileControl = function() {
    return this.fileField;
};

FileField.prototype.getSelectedFilename = function() {
    if (!this.selectedFileLabelEmpty() && this.fileFieldLabelText.innerHTML !== 'Click to Upload') {
        return this.getLabelText();
    } else {
        return null;
    }
};

FileField.prototype.clear = function() {
    this.fileFieldLabelText.innerHTML = 'Click to Upload'
};