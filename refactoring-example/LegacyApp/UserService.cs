using System;

namespace LegacyApp
{
    public class UserService
    {
        //AddUser_ShouldAddUserCorrectly
        //AddUser_ShouldFail_IncorrectEmail

        public bool AddUser(string firstName, string lastName, string email, DateTime dateOfBirth, int clientId)
        {
            if(!CheckNamesIfNull(firstName, lastName)){
                return false;
            }

            if (!CheckEmailCorrection(email))
            {
                return false;
            }

            if (!CheckAge(dateOfBirth))
            {
                return false;
            }



            var clientRepository = new ClientRepository();
            var client = clientRepository.GetById(clientId);

            if (client == null) { return false; }

            var user = new User
            {
                Client = client,
                DateOfBirth = dateOfBirth,
                EmailAddress = email,
                FirstName = firstName,
                LastName = lastName
            };


            CheckClientNameAndUpdateUser(client.Name, user);

            if (!CheckCreditLimit(user.HasCreditLimit, user.CreditLimit))
            {
                return false;
            }

            UserDataAccess.AddUser(user);
            return true;
        }

        public bool CheckNamesIfNull(string firstName, string lastName)
        {
            if (string.IsNullOrEmpty(firstName) || string.IsNullOrEmpty(lastName))
            {
                return false;
            }
            return true;
        }

        public bool CheckEmailCorrection(string email)
        {
            if(string.IsNullOrEmpty(email))
            {
                return false;
            }
            if (!email.Contains("@") || !email.Contains("."))
            {
                return false;
            }
            return true;
        }
        public bool CheckAge(DateTime dateOfBirth)
        {
            var now = DateTime.Now;
            int age = now.Year - dateOfBirth.Year;
            if (now.Month < dateOfBirth.Month || (now.Month == dateOfBirth.Month && now.Day < dateOfBirth.Day))
            {
                age--;
            }

            if (age < 21)
            {
                return false;
            }

            return true;
        }

        public void CheckClientNameAndUpdateUser(string name, User user)
        {
            if (name == "VeryImportantClient")
            {
                //Skip credit limit
                user.SkipCreditLimit();
            }
            else if (name == "ImportantClient")
            {
                user.AddCreditLimit();
            }
            else
            {
                //Do credit check
                user.DoCreditCheck();
            }
        }

        public bool CheckCreditLimit(bool hasCreditLimit , int creditLimit)
        {
            if (hasCreditLimit && creditLimit < 500)
            {
                return false;
            }
            return true;
        }

    }

    
}
