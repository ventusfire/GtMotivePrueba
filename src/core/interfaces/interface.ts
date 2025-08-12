export interface IAllMakes {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: IResult[];
}

export interface IResult {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}
