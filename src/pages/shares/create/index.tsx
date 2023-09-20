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

import { createShare } from 'apiSdk/shares';
import { shareValidationSchema } from 'validationSchema/shares';
import { CompatibilityInterface } from 'interfaces/compatibility';
import { getCompatibilities } from 'apiSdk/compatibilities';
import { ShareInterface } from 'interfaces/share';

function ShareCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ShareInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createShare(values);
      resetForm();
      router.push('/shares');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ShareInterface>({
    initialValues: {
      platform: '',
      date_shared: new Date(new Date().toDateString()),
      compatibility_id: (router.query.compatibility_id as string) ?? null,
    },
    validationSchema: shareValidationSchema,
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
              label: 'Shares',
              link: '/shares',
            },
            {
              label: 'Create Share',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Share
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.platform}
            label={'Platform'}
            props={{
              name: 'platform',
              placeholder: 'Platform',
              value: formik.values?.platform,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="date_shared" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Date Shared
            </FormLabel>
            <DatePicker
              selected={formik.values?.date_shared ? new Date(formik.values?.date_shared) : null}
              onChange={(value: Date) => formik.setFieldValue('date_shared', value)}
            />
          </FormControl>
          <AsyncSelect<CompatibilityInterface>
            formik={formik}
            name={'compatibility_id'}
            label={'Select Compatibility'}
            placeholder={'Select Compatibility'}
            fetcher={getCompatibilities}
            labelField={'percentage'}
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
              onClick={() => router.push('/shares')}
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
    entity: 'share',
    operation: AccessOperationEnum.CREATE,
  }),
)(ShareCreatePage);
