import {ID, Account, Client} from 'appwrite';
import Config from 'react-native-config';
import Snackbar from 'react-native-snackbar';

const appwriteClient = new Client();

const APPWRITE_ENDPOINT: string = Config.APPWRITE_ENDPOINT!;
const APPWRITE_PROJECT_ID: string = Config.APPWRITE_PROJECT_ID!;

// define
type createAccountUsers = {
  name: string;
  email: string;
  password: string;
};

type loginAccountUsers = {
  email: string;
  password: string;
};

class AppWriteService {
  account;

  constructor() {
    appwriteClient
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);

    this.account = new Account(appwriteClient);
  }
  // create new record user
  async CreateAccount({email, password, name}: createAccountUsers) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (userAccount) {
        try {
          await this.account.deleteSession('current');
        } catch (error) {
          console.log(error);
        }
        // TODO create login feature
        return this.Login({email, password});
      } else {
        return userAccount;
      }
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_LONG,
      });
      console.log('Appwrite service :: createaccount() :: ' + error);
    }
  }

  async Login({email, password}: loginAccountUsers) {
    try {
      console.log({email, password});

      const session = await this.account
        .getSession('current')
        .catch(() => null);

      if (session) {
        return session;
      } else {
        return await this.account.createEmailPasswordSession(email, password);
      }
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_LONG,
      });
      console.log('Appwrite service :: Loginaccount() :: ' + error);
    }
  }

  // getUsers
  async GetCurrentUsers() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log('Appwrite service :: getCurrentaccount() :: ' + error);
    }
  }

  // logout
  async Logout() {
    try {
      return await this.account.deleteSession('current');
    } catch (error) {
      console.log('Appwrite service :: Logoutaccount() :: ' + error);
    }
  }
}

export default AppWriteService;
