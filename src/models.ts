export interface ConfigItem {
  icon: string;
  description?: string;
  initialValue: number;
  valueUpdater: (newValue: number) => void;
}
