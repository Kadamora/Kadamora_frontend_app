import React, { useState } from 'react';
import { FiGitPullRequest, FiCreditCard, FiMessageSquare, FiThumbsUp, FiInfo } from 'react-icons/fi';

export default function NotificationsTabView() {
    const [toggles, setToggles] = useState<Record<string, boolean>>({
        incoming: false,
        payment: false,
        comment: false,
        reaction: false,
        ticket: false,
    });

    const toggle = (key: string) => {
        setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const items = [
        {
            key: 'incoming',
            icon: <FiGitPullRequest className="h-5 w-5 text-[#16A34A]" />,
            title: 'Incoming Request',
            desc: 'Lorem ipsum dolor sit amet consectetur. Pellentesque pellentesque nunc ut ante id ac vel. Sagittis diam penatibus magna scelerisque amet.',
        },
        {
            key: 'payment',
            icon: <FiCreditCard className="h-5 w-5 text-[#16A34A]" />,
            title: 'Payment Received',
            desc: 'Lorem ipsum dolor sit amet consectetur. Pellentesque pellentesque nunc ut ante id ac vel. Sagittis diam penatibus magna scelerisque amet.',
        },
        {
            key: 'comment',
            icon: <FiMessageSquare className="h-5 w-5 text-[#16A34A]" />,
            title: 'Post Comment (Timeline)',
            desc: 'Lorem ipsum dolor sit amet consectetur. Pellentesque pellentesque nunc ut ante id ac vel. Sagittis diam penatibus magna scelerisque amet.',
        },
        {
            key: 'reaction',
            icon: <FiThumbsUp className="h-5 w-5 text-[#16A34A]" />,
            title: 'Post Reaction (Timeline)',
            desc: 'Lorem ipsum dolor sit amet consectetur. Pellentesque pellentesque nunc ut ante id ac vel. Sagittis diam penatibus magna scelerisque amet.',
        },
        {
            key: 'ticket',
            icon: <FiInfo className="h-5 w-5 text-[#16A34A]" />,
            title: 'Ticket Raise (Support)',
            desc: 'Lorem ipsum dolor sit amet consectetur. Pellentesque pellentesque nunc ut ante id ac vel. Sagittis diam penatibus magna scelerisque amet.',
        },
    ];

    return (
        <div className="bg-white border border-[#BED3EB] rounded-2xl p-6 sm:p-8 shadow-2xs space-y-4 animate-fade-in">
            <div className="divide-y divide-[#E2E8F0]">
                {items.map((item) => {
                    const isEnabled = !!toggles[item.key];
                    return (
                        <div key={item.key} className="py-5 first:pt-0 last:pb-0 flex items-center justify-between gap-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#DCFCE7]/60 border border-[#BBF7D0] flex items-center justify-center shrink-0 mt-0.5">
                                    {item.icon}
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-bold text-[#0F172A]">{item.title}</h4>
                                    <p className="text-xs text-[#64748B] max-w-xl leading-relaxed">{item.desc}</p>
                                </div>
                            </div>

                            {/* Toggle Switch */}
                            <button
                                type="button"
                                onClick={() => toggle(item.key)}
                                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                    isEnabled ? 'bg-[#002E62]' : 'bg-[#CBD5E1]'
                                }`}
                            >
                                <span
                                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                        isEnabled ? 'translate-x-5' : 'translate-x-0'
                                    }`}
                                />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
