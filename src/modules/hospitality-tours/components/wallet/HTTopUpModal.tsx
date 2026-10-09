import { useState, useCallback } from 'react';
import { FiX, FiCheck, FiInfo, FiCopy } from 'react-icons/fi';
import { HiArrowsRightLeft } from 'react-icons/hi2';
import { BsCreditCard2Back } from 'react-icons/bs';
import Label from '@shared/components/Forms/Label';
import Input from '@shared/components/Forms/Input';
import HTButton from '../HTButton';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface HTTopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessDeposit?: (amount: number) => void;
}

type Step = 'select-type' | 'transfer-details' | 'processing' | 'completed';
type TopUpType = 'transfer' | 'card';

type StepperStatus = 'completed' | 'current' | 'upcoming';

interface StepperStep {
  id: string;
  label: string;
  showTimestamp?: boolean;
}

// ─────────────────────────────────────────────
// Constants / Config
// ─────────────────────────────────────────────
const TOP_UP_OPTIONS = [
  {
    id: 'transfer' as TopUpType,
    title: 'Top up with Transfer',
    description:
      'Top up your account easily by making a bank transfer. Once the transfer is confirmed, your balance will be updated instantly',
    icon: <HiArrowsRightLeft className="h-6 w-6" />,
  },
  {
    id: 'card' as TopUpType,
    title: 'Top up with Card',
    description:
      'Top up your account instantly using your debit or credit card. Fast, secure, and available anytime.',
    icon: <BsCreditCard2Back className="h-5 w-5" />,
  },
] as const;

const BANK_DETAILS = [
  { label: 'Bank Name', value: 'Wema Bank' },
  { label: 'Account Number', value: '015119521001', copyable: true },
  { label: 'Account Name', value: 'Kadamora Ltd' },
] as const;

const STEPPER_STEPS: StepperStep[] = [
  { id: 'sent', label: 'Sent', showTimestamp: true },
  { id: 'processing', label: 'Processing' },
  { id: 'received', label: 'Received', showTimestamp: true },
];

const STEP_TITLES: Record<Step, string> = {
  'select-type': 'Top up Wallet',
  'transfer-details': 'Top Up with Transfer',
  processing: 'Top Up with Transfer',
  completed: 'Top Up with Transfer',
};

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
const formatCurrency = (value: string | number): string => {
  const num = Number(value);
  if (!num || Number.isNaN(num)) return 'NGN 3,500,000.00';
  return `NGN ${num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const formatNow = (): string => {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────
const RadioIndicator = ({ selected }: { selected: boolean }) => (
  <div
    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
      selected ? 'border-[#10B981] bg-[#10B981]' : 'border-slate-300 bg-white'
    }`}
  >
    {selected && <div className="w-2 h-2 rounded-full bg-white" />}
  </div>
);

const TopUpOptionCard = ({
  option,
  selected,
  onSelect,
}: {
  option: (typeof TOP_UP_OPTIONS)[number];
  selected: boolean;
  onSelect: () => void;
}) => (
  <div
    onClick={onSelect}
    className="p-4 relative rounded-xl border border-[#CCE3FD] bg-white hover:border-[#93C5FD] transition-all cursor-pointer flex items-center justify-between gap-4"
  >
    <div className="flex items-center gap-3 flex-1 min-w-0">
      <div className="w-12 h-12 rounded-full bg-[#E6F9F0] text-[#10B981] flex items-center justify-center shrink-0 border border-[#86EAB8]">
        {option.icon}
      </div>
      <div className="space-y-0.5 min-w-0 flex-1">
        <h4 className="text-sm sm:text-[15px] font-semibold text-[#002E62]">
          {option.title}
        </h4>
        <p className="text-[11px] sm:text-xs text-[#7A7A7A] leading-relaxed">
          {option.description}
        </p>
      </div>
    </div>

    <div className="absolute top-2 right-2">
      <RadioIndicator selected={selected} />
    </div>
  </div>
);

const BankDetailRow = ({
  label,
  value,
  copyable,
  onCopy,
  copied,
}: {
  label: string;
  value: string;
  copyable?: boolean;
  onCopy?: (text: string) => void;
  copied?: boolean;
}) => (
  <div
    className={`border-b border-[#E4E4E7] pb-3 ${
      copyable ? 'flex items-center justify-between' : ''
    }`}
  >
    <div>
      <h4 className="text-sm sm:text-base font-semibold text-[#002E62] tracking-wide">
        {value}
      </h4>
      <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">{label}</p>
    </div>

    {copyable && onCopy && (
      <button
        type="button"
        onClick={() => onCopy(value)}
        className="inline-flex items-center gap-1.5 text-xs text-[#002E62] hover:underline p-1 cursor-pointer font-medium"
      >
        <FiCopy className="h-4 w-4" />
        <span>{copied ? 'Copied!' : 'Copy'}</span>
      </button>
    )}
  </div>
);

const StepperIcon = ({ status }: { status: StepperStatus }) => {
  if (status === 'completed') {
    return (
      <div className="w-6 h-6 rounded-full bg-[#10B981] text-white flex items-center justify-center shrink-0 shadow-2xs">
        <FiCheck className="h-3.5 w-3.5 stroke-[3]" />
      </div>
    );
  }

  if (status === 'current') {
    return (
      <div className="w-6 h-6 rounded-full border-4 border-[#A7F3D0] bg-[#10B981] flex items-center justify-center shrink-0 animate-pulse">
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </div>
    );
  }

  // upcoming
  return <div className="w-6 h-6 rounded-full bg-[#E2E8F0] shrink-0" />;
};

const Stepper = ({
  currentStepIndex,
  isCompletedView = false,
}: {
  currentStepIndex: number; // 0-based
  isCompletedView?: boolean;
}) => {
  return (
    <div className="space-y-0 py-2">
      {STEPPER_STEPS.map((step, index) => {
        let status: StepperStatus = 'upcoming';

        if (isCompletedView || index < currentStepIndex) {
          status = 'completed';
        } else if (index === currentStepIndex) {
          status = 'current';
        }

        const isLast = index === STEPPER_STEPS.length - 1;
        const showTimestamp =
          step.showTimestamp && status === 'completed';

        const lineColor =
          status === 'completed' || (status === 'current' && !isCompletedView)
            ? isCompletedView
              ? 'bg-[#EAECF0]'
              : 'bg-[#10B981]'
            : 'bg-slate-200';

        // In completed view all lines are the muted color
        const finalLineColor = isCompletedView ? 'bg-[#EAECF0]' : lineColor;

        return (
          <div key={step.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <StepperIcon status={status} />
              {!isLast && (
                <div className={`w-0.5 flex-1 min-h-[40px] ${finalLineColor}`} />
              )}
            </div>

            <div className={isLast ? '' : 'pb-6'}>
              <h4
                className={`text-sm ${
                  status === 'upcoming'
                    ? 'font-medium text-[#94A3B8]'
                    : 'font-semibold text-[#1E293B]'
                }`}
              >
                {step.label}
              </h4>
              {showTimestamp && (
                <p className="text-xs text-[#94A3B8] mt-0.5">{formatNow()}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
export default function HTTopUpModal({
  isOpen,
  onClose,
  onSuccessDeposit,
}: HTTopUpModalProps) {
  const [step, setStep] = useState<Step>('select-type');
  const [amount, setAmount] = useState('');
  const [selectedType, setSelectedType] = useState<TopUpType>('transfer');
  const [copied, setCopied] = useState(false);

  const resetState = useCallback(() => {
    setStep('select-type');
    setAmount('');
    setSelectedType('transfer');
    setCopied(false);
  }, []);

  const handleClose = useCallback(() => {
    resetState();
    onClose();
  }, [onClose, resetState]);

  const simulateProcessing = useCallback((delay = 2200) => {
    setStep('processing');
    setTimeout(() => setStep('completed'), delay);
  }, []);

  const handleProceed = () => {
    if (!amount || Number(amount) <= 0) return;

    if (selectedType === 'transfer') {
      setStep('transfer-details');
    } else {
      simulateProcessing(2000);
    }
  };

  const handleMadePayment = () => simulateProcessing(2200);

  const handleDone = () => {
    const numericAmount = Number(amount) || 500;
    onSuccessDeposit?.(numericAmount);
    handleClose();
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  const isProceedDisabled = !amount || Number(amount) <= 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in">
      <div
        className="bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden animate-scale-in transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 pt-6 pb-4 border-b border-[#F4F4F5] bg-white">
          <h2 className="text-xl font-semibold text-[#002E62]">
            {STEP_TITLES[step]}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-[#EBF3FF] hover:bg-[#DBEAFE] text-slate-500 hover:text-[#002E62] flex items-center justify-center transition-colors cursor-pointer"
            title="Close modal"
          >
            <FiX className="h-4 w-4 stroke-[2.5]" />
          </button>
        </div>

        {/* ── Step 1: Select Type ── */}
        {step === 'select-type' && (
          <div className="p-6 sm:px-8 pt-4 space-y-6">
            <div className="space-y-2">
              <Label>Deposit Amount</Label>
              <Input
                type="number"
                placeholder="Enter Amount to Deposit"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs sm:text-sm font-medium text-[#002E62]">
                Select Type
              </label>

              {TOP_UP_OPTIONS.map((option) => (
                <TopUpOptionCard
                  key={option.id}
                  option={option}
                  selected={selectedType === option.id}
                  onSelect={() => setSelectedType(option.id)}
                />
              ))}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleProceed}
                disabled={isProceedDisabled}
                className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer shadow-xs ${
                  isProceedDisabled
                    ? 'bg-[#CBD5E1] text-white cursor-not-allowed opacity-80'
                    : 'bg-[#002E62] hover:bg-[#072440] text-white'
                }`}
              >
                Proceed
              </button>
            </div>
          </div>
        )}

        {/* ── Step 2: Transfer Details ── */}
        {step === 'transfer-details' && (
          <div className="p-6 sm:px-8 pt-4 space-y-6">
            <div className="space-y-1">
              <p className="text-sm text-[#71717A]">Payment Amount</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#002E62]">
                {formatCurrency(amount)}
              </h3>
            </div>

            <div className="border-t border-[#E4E4E7] pt-3 space-y-4">
              {BANK_DETAILS.map((detail) => (
                <BankDetailRow
                  key={detail.label}
                  label={detail.label}
                  value={detail.value}
                  copyable={'copyable' in detail && detail.copyable}
                  onCopy={handleCopy}
                  copied={copied}
                />
              ))}
            </div>

            <div className="flex items-start gap-2.5 text-xs text-[#52525B] leading-relaxed pt-1">
              <FiInfo className="h-4 w-4 text-[#002E62] shrink-0 mt-0.5" />
              <p>
                If you send any amount below or above the requested top-up, it
                will be refunded to your account.
              </p>
            </div>

            <div className="pt-2">
              <HTButton type="button" onClick={handleMadePayment}>
                I've Made Payment
              </HTButton>
            </div>
          </div>
        )}

        {/* ── Step 3: Processing ── */}
        {step === 'processing' && (
          <div className="p-6 sm:px-8 pt-4">
            <Stepper currentStepIndex={1} />
          </div>
        )}

        {/* ── Step 4: Completed ── */}
        {step === 'completed' && (
          <div className="p-6 sm:px-8 pt-4 space-y-4">
            <Stepper currentStepIndex={2} isCompletedView />
            <div className="pt-2">
              <HTButton type="button" onClick={handleDone}>
                Done
              </HTButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}