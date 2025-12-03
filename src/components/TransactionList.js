import React from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_ALL_TRANSACTIONS } from '../graphql/queries';

const TransactionList = () => {
    const { loading, error, data } = useQuery(GET_ALL_TRANSACTIONS);

    if (loading) return <p>Chargement des transactions...</p>;
    if (error) return <p>Erreur : {error.message}</p>;

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Historique des transactions</h2>
            <div className="space-y-3">
                {data.allTransactions.map((t) => (
                    <div
                        key={t.id}
                        className="border rounded p-3 text-sm bg-white shadow-sm"
                    >
                        <p><span className="font-medium">ID :</span> {t.id}</p>
                        <p><span className="font-medium">Type :</span> {t.type}</p>
                        <p><span className="font-medium">Montant :</span> {t.montant}</p>
                        <p>
                            <span className="font-medium">Date :</span>{" "}
                            {new Date(t.date).toLocaleString()}
                        </p>
                        {t.compte && (
                            <p>
                                <span className="font-medium">Compte :</span>{" "}
                                {t.compte.id} ({t.compte.type}) – solde : {t.compte.solde}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionList;
