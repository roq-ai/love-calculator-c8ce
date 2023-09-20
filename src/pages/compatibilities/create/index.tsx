import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createCompatibility } from 'apiSdk/compatibilities';
import { compatibilityValidationSchema } from 'validationSchema/compatibilities';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { CompatibilityInterface } from 'interfaces/compatibility';

function CompatibilityCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CompatibilityInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCompatibility(values);
      resetForm();
      router.push('/compatibilities');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CompatibilityInterface>({
    initialValues: {
      percentage: 0,
      date_calculated: new Date(new Date().toDateString()),
      user1_id: (router.query.user1_id as string) ?? null,
      user2_id: (router.query.user2_id as string) ?? null,
    },
    validationSchema: compatibilityValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Compatibilities',
              link: '/compatibilities',
            },
            {
              label: 'Create Compatibility',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Compatibility
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Percentage"
            formControlProps={{
              id: 'percentage',
              isInvalid: !!formik.errors?.percentage,
            }}
            name="percentage"
            error={formik.errors?.percentage}
            value={formik.values?.percentage}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('percentage', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="date_calculated" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Date Calculated
            </FormLabel>
            <DatePicker
              selected={formik.values?.date_calculated ? new Date(formik.values?.date_calculated) : null}
              onChange={(value: Date) => formik.setFieldValue('date_calculated', value)}
            />
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user1_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user2_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/compatibilities')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'compatibility',
    operation: AccessOperationEnum.CREATE,
  }),
)(CompatibilityCreatePage);
