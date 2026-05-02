import db from '../db';

export interface Account {
    accountId: string,
    accountType: string | "AT_User", 
    accountState: string | "AS_Normal",
    unregDate: string | "0",
    country: string | "US",
    checkPurchasable: boolean | true
}

export function getAccount(accountId: string): null {
    const stmt = db.prepare('SELECT * FROM accounts WHERE accountId = ?');
    const account = stmt.get(accountId);
    
    return null;
}

export function createAccount(account: Account): void {
    const stmt = db.prepare('INSERT INTO accounts (accountId, accountType, accountState, unregDate, country, checkPurchasable) VALUES (?, ?, ?, ?, ?, ?)');
    stmt.run(account.accountId, account.accountType, account.accountState, account.unregDate, account.country, account.checkPurchasable ? 1 : 0);
}
