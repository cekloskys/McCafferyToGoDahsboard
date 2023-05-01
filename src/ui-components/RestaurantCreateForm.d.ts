/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type RestaurantCreateFormInputValues = {
    name?: string;
    image?: string;
    startHrs?: string;
    endHrs?: string;
    location?: string;
    adminSub?: string;
    serviceFee?: number;
};
export declare type RestaurantCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
    startHrs?: ValidationFunction<string>;
    endHrs?: ValidationFunction<string>;
    location?: ValidationFunction<string>;
    adminSub?: ValidationFunction<string>;
    serviceFee?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RestaurantCreateFormOverridesProps = {
    RestaurantCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    startHrs?: PrimitiveOverrideProps<TextFieldProps>;
    endHrs?: PrimitiveOverrideProps<TextFieldProps>;
    location?: PrimitiveOverrideProps<TextFieldProps>;
    adminSub?: PrimitiveOverrideProps<TextFieldProps>;
    serviceFee?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RestaurantCreateFormProps = React.PropsWithChildren<{
    overrides?: RestaurantCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: RestaurantCreateFormInputValues) => RestaurantCreateFormInputValues;
    onSuccess?: (fields: RestaurantCreateFormInputValues) => void;
    onError?: (fields: RestaurantCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RestaurantCreateFormInputValues) => RestaurantCreateFormInputValues;
    onValidate?: RestaurantCreateFormValidationValues;
} & React.CSSProperties>;
export default function RestaurantCreateForm(props: RestaurantCreateFormProps): React.ReactElement;
