import { ValidatorFn, AbstractControl } from "@angular/forms";

const tagsValidator = (): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const tags = control.value;

    if (!tags || typeof tags !== 'string') {
      return null;
    }

    const tagsArray = tags.split(',');
    if (tagsArray.length === 0 || (tagsArray.length === 1 && tagsArray[0].trim() === '')) {
      return { 'tagsInvalid': true, 'message': 'Insira pelo menos uma palavra.' };
    }

    for (const tag of tagsArray) {
      if (tag.trim() === '') {
        return { 'tagsInvalid': true, 'message': 'Palavras não podem ser vazias.' };
      }
    }

    return null;
  };
}

const inputValueIsNumber = (): ValidatorFn => {
  return (control: AbstractControl) : { [key: string]: any } | null => {
    const inputValue = control.value;

    if(!inputValue || typeof inputValue !== 'string'){
      return null;
    }

    if(!(/^\d+(\.\d{1,2})?$/.test(inputValue))){
      return { 'isNumberInvalid': true, 'message': 'Apenas números' };
    }

    return null
  }
}

export {
  tagsValidator,
  inputValueIsNumber
}