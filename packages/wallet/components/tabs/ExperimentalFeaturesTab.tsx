import { zodResolver } from '@hookform/resolvers/zod'
import { useUiLibrary } from '@web3sheet/core'
import { Checkbox } from '@web3sheet/ui/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormSubmitButton,
} from '@web3sheet/ui/ui/form'
import Link from 'next/link'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { NonPrimaryTabProps } from '../UserSheet'

export type ExperimentalFeaturesTabConfig<Flag extends string> = ExperimentalFeaturesFormProps &
  ExperimentalFeatureFlagsProps<Flag> & {
    clearAcceptExperimental?: boolean
    reportIssueLink: {
      label: string
      href: string
    }
  }

export type ExperimentalFeaturesLibraryConfig<Flag extends string> = {
  useFeatureFlagsGeneric: () => Record<Flag, boolean>
  useExperimentalFeaturesTerms: () => {
    accepted: boolean
    setAccepted: (accepted: boolean) => void
  }
  useSetExperimentalFeatureFlagGeneric: () => {
    setFeatureFlag: (flag: Flag, value: boolean) => void
  }
  isExperimentalFeatureFlag: (flag: string) => boolean
}

export type UniqueExperimentalFeaturesTabProps = NonPrimaryTabProps

type ExperimentalFeaturesTabProps<Flag extends string> = UniqueExperimentalFeaturesTabProps &
  ExperimentalFeaturesTabConfig<Flag>

export function ExperimentalFeaturesTab<Flag extends string>({
  handleBackButtonClick,
  clearAcceptExperimental,
  reportIssueLink,
  termsLink,
  experimentalFeatureFlags,
  experimentalFeatureFlagsInfo,
  experimentalFeaturesLibraryConfig,
}: ExperimentalFeaturesTabProps<Flag>) {
  const UI = useUiLibrary()
  const { useExperimentalFeaturesTerms } = experimentalFeaturesLibraryConfig
  const { accepted, setAccepted } = useExperimentalFeaturesTerms()

  useEffect(() => {
    if (clearAcceptExperimental) {
      setAccepted(false)
    }
  }, [clearAcceptExperimental, setAccepted])

  return (
    <>
      <UI.SheetHeader className="flex flex-row items-center gap-2 align-middle">
        <UI.BackButton onClick={handleBackButtonClick} />
        <UI.SheetTitle>Experimental Features</UI.SheetTitle>
      </UI.SheetHeader>
      <UI.SheetDescription>
        Experimental features are under active development and enabling any experimental feature may
        lead to an increase in bugs or unexpected issues. The use of these features are at your own
        risk. If you encounter any issues with these experimental features please create an issue on{' '}
        <Link
          href={reportIssueLink.href}
          className="text-w3s-primary"
          referrerPolicy="no-referrer"
          target="_blank"
        >
          {reportIssueLink.label}
        </Link>{' '}
        so we can improve these features and move them out of experimental status.
      </UI.SheetDescription>
      {accepted ? (
        <ExperimentalFeatureFlags
          experimentalFeatureFlags={experimentalFeatureFlags}
          experimentalFeatureFlagsInfo={experimentalFeatureFlagsInfo}
          experimentalFeaturesLibraryConfig={experimentalFeaturesLibraryConfig}
        />
      ) : (
        <ExperimentalFeaturesForm
          termsLink={termsLink}
          useExperimentalFeaturesTerms={useExperimentalFeaturesTerms}
        />
      )}
    </>
  )
}

type ExperimentalFeatureFlagsProps<Flag extends string> = {
  experimentalFeatureFlags: Flag[]
  experimentalFeatureFlagsInfo: Record<Flag, { name: string; description: string }>
  experimentalFeaturesLibraryConfig: ExperimentalFeaturesLibraryConfig<Flag>
}

function ExperimentalFeatureFlags<Flag extends string>({
  experimentalFeatureFlags,
  experimentalFeatureFlagsInfo,
  experimentalFeaturesLibraryConfig: {
    useFeatureFlagsGeneric,
    useSetExperimentalFeatureFlagGeneric,
    isExperimentalFeatureFlag,
  },
}: ExperimentalFeatureFlagsProps<Flag>) {
  const UI = useUiLibrary()
  const featureFlags = useFeatureFlagsGeneric()

  const { setFeatureFlag } = useSetExperimentalFeatureFlagGeneric()

  return (
    <>
      {experimentalFeatureFlags.map((flag) => {
        if (!isExperimentalFeatureFlag(flag)) {
          console.error(`${flag} is not a valid experimental feature flag!`)
          return null
        }

        return (
          <div key={flag} className="flex flex-col items-start gap-2 rounded-md border p-4 text-xs">
            <span className="inline-flex w-full flex-row items-center justify-between align-middle text-lg font-medium leading-none">
              {experimentalFeatureFlagsInfo[flag]?.name}
              <UI.Switch
                checked={featureFlags[flag]}
                onCheckedChange={(value: boolean) => setFeatureFlag(flag, value)}
              />
            </span>
            <p className="font-normal">{experimentalFeatureFlagsInfo[flag]?.description}</p>
          </div>
        );
      })}
    </>
  )
}

type ExperimentalFeaturesFormProps = {
  useExperimentalFeaturesTerms: () => {
    accepted: boolean
    setAccepted: (accepted: boolean) => void
  }
  termsLink: {
    label: string
    href: string
  }
}

function ExperimentalFeaturesForm({
  termsLink,
  useExperimentalFeaturesTerms,
}: ExperimentalFeaturesFormProps) {
  const { setAccepted } = useExperimentalFeaturesTerms()

  const FormSchema = z.object({
    accept: z
      .boolean()
      .default(false)
      .refine((value) => value),
  })

  type FormSchemaType = z.infer<typeof FormSchema>

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      accept: false,
    },
  })

  function onSubmit(data: FormSchemaType) {
    if (!data.accept) {
      // toast.error(
      //   <span>
      //     You must accept the{' '}
      //     <Link href={termsLink.href} className="underline" target="_blank" prefetch>
      //       {termsLink.label}
      //     </Link>{' '}
      //     to participate
      //   </span>,
      // )
    } else {
      // toast.success(
      //   <span>
      //     You have accepted the Testnet Incentive Program{' '}
      //     <Link href={termsLink.href} className="underline" target="_blank" prefetch>
      //       {termsLink.label}
      //     </Link>
      //     .
      //   </span>,
      // )
      setAccepted(true)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="accept"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 text-xs">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="leading-none">
                I have read, understand, and agree to the{' '}
                <Link href={termsLink.href} target="_blank" className="text-w3s-primary" prefetch>
                  {termsLink.label}
                </Link>
                , including any additional guidelines and future modifications outlined therein.
              </FormLabel>
            </FormItem>
          )}
        />
        <FormSubmitButton>Continue</FormSubmitButton>
      </form>
    </Form>
  )
}
