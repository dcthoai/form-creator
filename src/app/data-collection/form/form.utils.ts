
export function closeAllTextEditor(): void {
    const editors = document.querySelectorAll('.editor');

    Array.from(editors).forEach(editor => {
        editor.classList.remove('active');
    });
}

export function closeAllQuestionEditor(): void {
    const questions = document.querySelectorAll('.question');

    Array.from(questions).forEach(question => {
        question.classList.remove('active');
    });
}

export function closeFormTitleEditor(): void {
    const formTitleEditor = document.querySelector('.form .form__title');

    formTitleEditor.classList.remove('active');
}

export function moveFormControlToPosition(input: HTMLElement | number): void {
    const formControlElement = document.querySelector('.form .form__control') as HTMLElement;
    let topPosition = 0;  // initial default position of the form control element

    if (typeof input === 'number') {
        topPosition = input;
    } else {
        let offsetTop = 0;

        // Sum all relative position of the input element and its parent elements
        while (input) {
            offsetTop += input.offsetTop;
            input = input.offsetParent as HTMLElement;
        }

        topPosition += offsetTop - 90;   // Get absolute position of input element
    }

    formControlElement.style.top = `${topPosition}px`;
}
