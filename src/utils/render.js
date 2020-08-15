import View from '../view/View';


export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, element, position) => {

  if (container instanceof View) {
    container = container.getElement();
  }

  if (element instanceof View) {
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

export const renderTemplate = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const replace = (newElement, oldElement) => {
  if (oldElement instanceof View) {
    oldElement = oldElement.getElement();
  }

  if (newElement instanceof View) {
    newElement = newElement.getElement();
  }

  const parent = oldElement.parentElement;

  if (parent === null || oldElement === null || newElement === null) {
    throw new Error(`Can't replace unexisting elements`);
  }
  parent.replaceChild(newElement, oldElement);
};
