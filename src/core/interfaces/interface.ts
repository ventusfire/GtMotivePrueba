export interface IAllMakes {
  Count: number;
  Message: string;
  SearchCriteria: null;
  Results: IResult[];
}

export interface IResult {
  Make_ID: number;
  Make_Name: string;
}

// Vehicle Types

export interface IVehiclesType {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: IResultVT[];
}

export interface IResultVT {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
}

// Models for Make

export interface IModelForMake {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: IResultMFM[];
}

export interface IResultMFM {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}
