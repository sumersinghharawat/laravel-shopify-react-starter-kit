
// @flow
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { router, useForm } from '@inertiajs/react';
import * as React from 'react';

export default function InstallApp({ ...props }) {
    const { data, setData, post, errors } = useForm({
        shop: '',
    });

    const submit = (e) => {
        e.preventDefault();

        router.post(route('shopify-app.installing'), data);
    };

    return (
        <div className='flex flex-col items-center justify-start w-1/3 h-full gap-5 p-16 mx-auto my-6 border shadow'>
            <h1 className='text-2xl'>Welcome to, Integrity Wardrobe</h1>
            <h1 className='text-2xl'>Install Shopify App</h1>
            <form className='container form' onSubmit={submit}>
                <InputLabel htmlFor="shop" value="Enter Your Shop" />

                <TextInput
                    id="shop"
                    name="shop"
                    value={data.shop}
                    className="block w-full mt-1"
                    autoComplete="shop"
                    onChange={(e) =>
                        setData(
                            'shop',
                            e.target.value.replace(/https?:\/\//, '').replace(/\/.*/, '')
                        )
                    }
                />

                <InputError message={errors.shop} className="mt-2" />

                <PrimaryButton className="mt-4">Install</PrimaryButton>
            </form>
        </div>
    );
}

