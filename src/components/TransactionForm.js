import React, { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { ADD_TRANSACTION } from '../graphql/mutations';

const TransactionForm = () => {
    const [montant, setMontant] = useState('');
    const [type, setType] = useState('DEPOT');
    const [compteId, setCompteId] = useState('');

    const [addTransaction, { loading }] = useMutation(ADD_TRANSACTION);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addTransaction({
                variables: {
                    transactionRequest: {
                        montant: parseFloat(montant),
                        type,
                        compteId,
                    },
                },
            });

            // reset
            setMontant('');
            setType('DEPOT');
            setCompteId('');
        } catch (error) {
            console.error("Erreur lors de l'ajout de la transaction :", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold">Ajouter une transaction</h2>

            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Montant</label>
                <input
                    type="number"
                    value={montant}
                    onChange={(e) => setMontant(e.target.value)}
                    required
                    className="border rounded px-3 py-2"
                    placeholder="Montant"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Type</label>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="border rounded px-3 py-2"
                >
                    <option value="DEPOT">Dépôt</option>
                    <option value="RETRAIT">Retrait</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">ID du compte</label>
                <input
                    type="text"
                    value={compteId}
                    onChange={(e) => setCompteId(e.target.value)}
                    required
                    className="border rounded px-3 py-2"
                    placeholder="ID du compte"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                {loading ? 'Enregistrement...' : 'Ajouter la transaction'}
            </button>
        </form>
    );
};

export default TransactionForm;
