import { ComponentClass } from '../interface/ComponentClass';
import { Options, settings } from '../interface/ToolSettings';
export type WindowItems = Options[] | Date[];
export function isOption(component: settings, index?: number): boolean {
  if (!index) index = 0;
  if (component.options[index] && component.options[index].title) {
    return true;
  }
  return false;
}

export function isDate(component: settings, index?: number): boolean {
  if (!index) index = 0;
  if (component.date[index] && component.date[index].title) {
    return true;
  }
  return false;
}
