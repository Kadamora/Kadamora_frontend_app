import { useState } from 'react';
import { transactions as mockTransactions } from '../../data/mock';
import type { Transaction } from '../../types';
import HTPaymentOverviewCard from '@modules/hospitality-tours/components/wallet/HTPaymentOverviewCard';
import HTTransactionHistoryTable from '@modules/hospitality-tours/components/wallet/HTTransactionHistoryTable';
import HTTopUpModal from '@modules/hospitality-tours/components/wallet/HTTopUpModal';
import HTWithdrawModal from '@modules/hospitality-tours/components/wallet/HTWithdrawModal';
import HTTransactionDetailModal from '@modules/hospitality-tours/components/wallet/HTTransactionDetailModal';

export default function HTWalletPage() {
    const [balance, setBalance] = useState(98370.80);
    const [transactionsList, setTransactionsList] = useState<Transaction[]>(mockTransactions);

    // Modal states
    const [isTopUpOpen, setIsTopUpOpen] = useState(false);
    const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    // Handle Topup success
    const handleDepositSuccess = (amount: number) => {
        setBalance((prev) => prev + amount);
        const newTxn: Transaction = {
            id: `TXN-${String(Math.floor(10000 + Math.random() * 90000))}-${String(Math.floor(1000 + Math.random() * 9000))}`,
            type: 'Deposit',
            date: new Date().toISOString(),
            amount: amount,
            status: 'Completed',
        };
        setTransactionsList([newTxn, ...transactionsList]);
    };

    // Handle Withdraw success
    const handleWithdrawSuccess = (amount: number) => {
        setBalance((prev) => Math.max(0, prev - amount));
        const newTxn: Transaction = {
            id: `TXN-${String(Math.floor(10000 + Math.random() * 90000))}-${String(Math.floor(1000 + Math.random() * 9000))}`,
            type: 'Withdraw',
            date: new Date().toISOString(),
            amount: amount,
            status: 'Completed',
        };
        setTransactionsList([newTxn, ...transactionsList]);
    };

    const handleViewTransaction = (txn: Transaction) => {
        setSelectedTransaction(txn);
        setIsDetailOpen(true);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-fade-in">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-[#002E62]">Wallet</h1>
                <p className="text-sm text-[#52525B] mt-1">
                    Choose the type of listing you want to create on Kadamora and start reaching thousands of travelers
                </p>
            </div>

            {/* Top: Payment Overview Card with Balance & Chart */}
            <HTPaymentOverviewCard
                balance={balance}
                currency="NGN"
                trendAmount={347.32}
                trendPercent={6.3}
                dateLabel="July 10, 2025"
                onDepositClick={() => setIsTopUpOpen(true)}
                onWithdrawClick={() => setIsWithdrawOpen(true)}
            />

            {/* Bottom: Transaction History Table */}
            <HTTransactionHistoryTable
                transactions={transactionsList}
                onViewTransaction={handleViewTransaction}
            />

            {/* Top Up / Deposit Modal (Multi-step) */}
            <HTTopUpModal
                isOpen={isTopUpOpen}
                onClose={() => setIsTopUpOpen(false)}
                onSuccessDeposit={handleDepositSuccess}
            />

            {/* Withdraw Modal */}
            <HTWithdrawModal
                isOpen={isWithdrawOpen}
                onClose={() => setIsWithdrawOpen(false)}
                currentBalance={balance}
                onSuccessWithdraw={handleWithdrawSuccess}
            />

            {/* Transaction Detail Receipt Modal */}
            <HTTransactionDetailModal
                transaction={selectedTransaction}
                isOpen={isDetailOpen}
                onClose={() => {
                    setIsDetailOpen(false);
                    setSelectedTransaction(null);
                }}
            />
        </div>
    );
}
