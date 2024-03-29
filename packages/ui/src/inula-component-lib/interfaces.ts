// General types important to applications using Material built components
export interface EventEmitter<T = any> {
  emit: (data?: T) => CustomEvent<T>;
}

export interface StyleInulaProps {
  class?: string;
  className?: string;
  style?: { [key: string]: any };
  children?: any;
}

export interface OverlayEventDetail<T = any> {
  data?: T;
  role?: string;
}

export interface OverlayInterface {
  el: HTMLElement;
  animated: boolean;
  keyboardClose: boolean;
  overlayIndex: number;
  presented: boolean;

  enterAnimation?: any;
  leaveAnimation?: any;

  didPresent: EventEmitter<void>;
  willPresent: EventEmitter<void>;
  willDismiss: EventEmitter<OverlayEventDetail>;
  didDismiss: EventEmitter<OverlayEventDetail>;

  present(): Promise<void>;
  dismiss(data?: any, role?: string): Promise<boolean>;
}
