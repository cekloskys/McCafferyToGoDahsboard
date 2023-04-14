/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { Restaurant } from "../models";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
export default function RestaurantCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onCancel,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: undefined,
    image: undefined,
    startHrs: undefined,
    endHrs: undefined,
    location: undefined,
    adminSub: undefined,
    serviceFee: undefined,
  };
  const [name, setName] = React.useState(initialValues.name);
  const [image, setImage] = React.useState(initialValues.image);
  const [startHrs, setStartHrs] = React.useState(initialValues.startHrs);
  const [endHrs, setEndHrs] = React.useState(initialValues.endHrs);
  const [location, setLocation] = React.useState(initialValues.location);
  const [adminSub, setAdminSub] = React.useState(initialValues.adminSub);
  const [serviceFee, setServiceFee] = React.useState(initialValues.serviceFee);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setImage(initialValues.image);
    setStartHrs(initialValues.startHrs);
    setEndHrs(initialValues.endHrs);
    setLocation(initialValues.location);
    setAdminSub(initialValues.adminSub);
    setServiceFee(initialValues.serviceFee);
    setErrors({});
  };
  const validations = {
    name: [{ type: "Required" }],
    image: [{ type: "Required" }],
    startHrs: [{ type: "Required" }],
    endHrs: [{ type: "Required" }],
    location: [{ type: "Required" }],
    adminSub: [],
    serviceFee: [],
  };
  const runValidationTasks = async (fieldName, value) => {
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          image,
          startHrs,
          endHrs,
          location,
          adminSub,
          serviceFee,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          await DataStore.save(new Restaurant(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...rest}
      {...getOverrideProps(overrides, "RestaurantCreateForm")}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              image,
              startHrs,
              endHrs,
              location,
              adminSub,
              serviceFee,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Image"
        isRequired={true}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              image: value,
              startHrs,
              endHrs,
              location,
              adminSub,
              serviceFee,
            };
            const result = onChange(modelFields);
            value = result?.image ?? value;
          }
          if (errors.image?.hasError) {
            runValidationTasks("image", value);
          }
          setImage(value);
        }}
        onBlur={() => runValidationTasks("image", image)}
        errorMessage={errors.image?.errorMessage}
        hasError={errors.image?.hasError}
        {...getOverrideProps(overrides, "image")}
      ></TextField>
      <TextField
        label="Start hrs"
        isRequired={true}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              image,
              startHrs: value,
              endHrs,
              location,
              adminSub,
              serviceFee,
            };
            const result = onChange(modelFields);
            value = result?.startHrs ?? value;
          }
          if (errors.startHrs?.hasError) {
            runValidationTasks("startHrs", value);
          }
          setStartHrs(value);
        }}
        onBlur={() => runValidationTasks("startHrs", startHrs)}
        errorMessage={errors.startHrs?.errorMessage}
        hasError={errors.startHrs?.hasError}
        {...getOverrideProps(overrides, "startHrs")}
      ></TextField>
      <TextField
        label="End hrs"
        isRequired={true}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              image,
              startHrs,
              endHrs: value,
              location,
              adminSub,
              serviceFee,
            };
            const result = onChange(modelFields);
            value = result?.endHrs ?? value;
          }
          if (errors.endHrs?.hasError) {
            runValidationTasks("endHrs", value);
          }
          setEndHrs(value);
        }}
        onBlur={() => runValidationTasks("endHrs", endHrs)}
        errorMessage={errors.endHrs?.errorMessage}
        hasError={errors.endHrs?.hasError}
        {...getOverrideProps(overrides, "endHrs")}
      ></TextField>
      <TextField
        label="Location"
        isRequired={true}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              image,
              startHrs,
              endHrs,
              location: value,
              adminSub,
              serviceFee,
            };
            const result = onChange(modelFields);
            value = result?.location ?? value;
          }
          if (errors.location?.hasError) {
            runValidationTasks("location", value);
          }
          setLocation(value);
        }}
        onBlur={() => runValidationTasks("location", location)}
        errorMessage={errors.location?.errorMessage}
        hasError={errors.location?.hasError}
        {...getOverrideProps(overrides, "location")}
      ></TextField>
      <TextField
        label="Admin sub"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              image,
              startHrs,
              endHrs,
              location,
              adminSub: value,
              serviceFee,
            };
            const result = onChange(modelFields);
            value = result?.adminSub ?? value;
          }
          if (errors.adminSub?.hasError) {
            runValidationTasks("adminSub", value);
          }
          setAdminSub(value);
        }}
        onBlur={() => runValidationTasks("adminSub", adminSub)}
        errorMessage={errors.adminSub?.errorMessage}
        hasError={errors.adminSub?.hasError}
        {...getOverrideProps(overrides, "adminSub")}
      ></TextField>
      <TextField
        label="Service fee"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        onChange={(e) => {
          let value = Number(e.target.value);
          if (isNaN(value)) {
            setErrors((errors) => ({
              ...errors,
              serviceFee: "Value must be a valid number",
            }));
            return;
          }
          if (onChange) {
            const modelFields = {
              name,
              image,
              startHrs,
              endHrs,
              location,
              adminSub,
              serviceFee: value,
            };
            const result = onChange(modelFields);
            value = result?.serviceFee ?? value;
          }
          if (errors.serviceFee?.hasError) {
            runValidationTasks("serviceFee", value);
          }
          setServiceFee(value);
        }}
        onBlur={() => runValidationTasks("serviceFee", serviceFee)}
        errorMessage={errors.serviceFee?.errorMessage}
        hasError={errors.serviceFee?.hasError}
        {...getOverrideProps(overrides, "serviceFee")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={resetStateValues}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Cancel"
            type="button"
            onClick={() => {
              onCancel && onCancel();
            }}
            {...getOverrideProps(overrides, "CancelButton")}
          ></Button>
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
