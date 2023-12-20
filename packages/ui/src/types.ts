// why? @material/web 的类型都是必须的，可以在补充文档的时候，来写暴露出去的 api 配置
export interface MdFilledButton {
  raised?: boolean;
  unelevated?: boolean;
  outlined?: boolean;
  dense?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: any;
  href?: string;
  trailingIcon?: any;
}

export type {
  MdAssistChip,
  MdBrandedFab,
  MdCheckbox,
  MdChipSet,
  MdCircularProgress,
  MdDialog,
  MdDivider,
  MdElevatedButton,
  MdElevation,
  MdFab,
  MdFilledField,
  MdFilledIconButton,
  MdFilledSelect,
  MdFilledTextField,
  MdFilledTonalButton,
  MdFilledTonalIconButton,
  MdFilterChip,
  MdFocusRing,
  MdIcon,
  MdIconButton,
  MdInputChip,
  MdLinearProgress,
  MdList,
  MdListItem,
  MdMenu,
  MdMenuItem,
  MdOutlinedButton,
  MdOutlinedField,
  MdOutlinedIconButton,
  MdOutlinedSelect,
  MdOutlinedTextField,
  MdPrimaryTab,
  MdRadio,
  MdRipple,
  MdSecondaryTab,
  MdSelectOption,
  MdSlider,
  MdSubMenu,
  MdSuggestionChip,
  MdSwitch,
  MdTabs,
  MdTextButton,
} from '@material/web/all';
