import React, { ComponentType, Context, createContext, PureComponent } from "react";
import { IPatient, IPractitioner } from "../../../../HoloRepositoryUI-Types";

export type PidToPatientsMap = Record<string, IPatient>;

export type PropsWithContext = { context?: IAppState };

export interface IAppState {
  practitioner?: IPractitioner;
  patients: PidToPatientsMap;
  selectedPatientId?: string;
  handlePractitionerChange: Function;
  handlePatientsChange: Function;
  handleSelectedPatientIdChange: Function;
}

const initialState: IAppState = {
  practitioner: undefined,
  patients: {},
  selectedPatientId: undefined,
  handlePractitionerChange: () => {},
  handleSelectedPatientIdChange: () => {},
  handlePatientsChange: () => {}
};

// using same interface for App state and context
const AppContext: Context<IAppState> = createContext(initialState);

const withAppContext = <ComponentProps extends {}>(Component: ComponentType<ComponentProps>) =>
  class WithContext extends PureComponent<ComponentProps & PropsWithContext> {
    render() {
      return (
        <AppContext.Consumer>
          {(context: IAppState) => <Component {...this.props} context={context} />}
        </AppContext.Consumer>
      );
    }
  };

export { initialState, AppContext, withAppContext };
