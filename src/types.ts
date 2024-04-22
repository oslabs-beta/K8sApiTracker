export type ApiObj = {
  deprecationStatus: string,
  location: string,
  apiVersion: string,
  name: string,
  description: string,
  newVersion: string
}

export type MainData = ApiObj[];

export type PieChartData = { name: string, value: number, color: string }

export type PieChartInfo = PieChartData[]

export type DashboardContainerProps = {
  chartData: PieChartData[]
}

export type FilterDropdownProps = {
  filters: string[],
  filter: (status: string) => void
}

export type PieChartProps = {
  chartData: PieChartData[]
}

export type RowProps = {
  api: string,
  location: string,
  status: string,
  stable: string,
  notes: string
}

export type RowHeaderProps = {
  api: string,
  status: string,
  location: string,
  stable: string,
  notes: string,
  filters: string[],
  filter: (status: string) => void
}

export type ScanButtonProps = {
  id: number,
  text: string,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  isLoading: boolean
};

export type ScanButtonsContainerProps = {
  handleClick: (endpoint: string) => void,
  isLoading: boolean,
  repoHandleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  chartHandleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  helmChartPath?: string,
  helmRepoPath?: string
}

export type ThemeContextType = {
  theme: string,
  setTheme: (input: string) => void;
}