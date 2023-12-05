export interface walletStatements {
    date: Date;
    walletType: string;
    amount: number;
    turfName: string; 
    transaction: 'debit' | 'credit';
    user:string
}