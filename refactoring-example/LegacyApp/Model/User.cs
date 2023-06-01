using System;

namespace LegacyApp
{
    public class User
    {
        public object Client { get; internal set; }
        public DateTime DateOfBirth { get; internal set; }
        public string EmailAddress { get; internal set; }
        public string FirstName { get; internal set; }
        public string LastName { get; internal set; }
        public bool HasCreditLimit { get; internal set; }
        public int CreditLimit { get; internal set; }

        public void SkipCreditLimit()
        {
            HasCreditLimit = false;
        }

        public void AddCreditLimit()
        {
            using (var userCreditService = new UserCreditService())
            {
                int creditLimit = userCreditService.GetCreditLimit(FirstName, LastName, DateOfBirth);
                creditLimit = creditLimit * 2;
                CreditLimit = creditLimit;
            }
        }
        public void DoCreditCheck()
        {
            HasCreditLimit = true;
            using (var userCreditService = new UserCreditService())
            {
                int creditLimit = userCreditService.GetCreditLimit(FirstName, LastName, DateOfBirth);
                CreditLimit = creditLimit;
            }
        }
    }
}