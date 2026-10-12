import React from 'react';
import { usePropertyListingForm } from '../formContext';
import Input from '@shared/components/Forms/Input';
import Select from '@shared/components/Forms/Select';
import Textarea from '@shared/components/Forms/Textarea';

const RentPaymentStep: React.FC = () => {
    const { state, updateField } = usePropertyListingForm();

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    title="Rent Price"
                    placeholder="Enter rent price"
                    value={state.price}
                    onChange={(event) => updateField('price', event.target.value)}
                    required
                />
                <Select
                    title="Payment Term"
                    value={state.paymentTerm}
                    onChange={(value) => updateField('paymentTerm', value)}
                    options={[
                        { label: 'Select payment term', value: '' },
                        { label: 'Monthly', value: 'monthly' },
                        { label: 'Quarterly', value: 'quarterly' },
                        { label: 'Biannually', value: 'biannually' },
                        { label: 'Annually', value: 'annually' },
                    ]}
                />
                <Input
                    title="Service Charge"
                    placeholder="Enter service charge"
                    value={state.serviceCharge}
                    onChange={(event) => updateField('serviceCharge', event.target.value)}
                    containerClassName="md:col-span-2"
                />
                <Textarea
                    title="Additional Charges"
                    placeholder="List any additional charges"
                    value={state.additionalCharges}
                    onChange={(event) => updateField('additionalCharges', event.target.value)}
                    containerClassName="md:col-span-2"
                    rows={3}
                />
            </div>
        </div>
    );
};

export default RentPaymentStep;

