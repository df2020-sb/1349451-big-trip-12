import AbstractView from '../view/abstract';


export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, element, position) => {

  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  if (element instanceof AbstractView) {
    element = element.getElement();
  }

  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const replace = (newElement, oldElement) => {
  if (oldElement instanceof AbstractView) {
    oldElement = oldElement.getElement();
  }

  if (newElement instanceof AbstractView) {
    newElement = newElement.getElement();
  }

  const parent = oldElement.parentElement;

  if (parent === null || newElement === null) {
    throw new Error(`Can't replace unexisting elements`);
  }
  parent.replaceChild(newElement, oldElement);
};

export const remove = (element) => {
  if (!(element instanceof AbstractView)) {
    throw new Error(`Can remove only components`);
  }
  element.getElement().remove();
  element.removeElement();
};
