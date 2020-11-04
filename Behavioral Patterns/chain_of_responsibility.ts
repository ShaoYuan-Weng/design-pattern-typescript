/*
Chain of responsibility pattern handles the command objects with a series of processing objects. If the processing object cannot handle the incoming type of command object, it will let the next processing object to handle it. So it is possible that in the end no processing object can handle the command object.
*/

type AuthenticationProvider = UserpasswordProvider | OAuthProvider;

interface UserpasswordProvider {
  type: "Userpassword"
}

interface OAuthProvider {
  type: 'OAuth'
}

abstract class AuthenticationProcessor {
  protected nextProcessor?: AuthenticationProcessor;

  setNextProcessor(nextProcessor: AuthenticationProcessor) {
    this.nextProcessor = nextProcessor;
  }

  abstract isAuthorized(authProvider: AuthenticationProvider): void;
}

class UserpasswordAuthenticationProcessor extends AuthenticationProcessor {

  isAuthorized(authProvider: AuthenticationProvider) {
    if (authProvider.type === 'Userpassword') {
      console.log('Authenticate with UserPassword');
      return;
    }
    if (this.nextProcessor !== undefined) {
      this.nextProcessor.isAuthorized(authProvider);
    }
  }
}

class OAuthAuthenticationProcessor extends AuthenticationProcessor {

  isAuthorized(authProvider: AuthenticationProvider) {
    if (authProvider.type === 'OAuth') {
      console.log('Authenticate with OAuth');
      return;
    }
    if (this.nextProcessor !== undefined) {
      this.nextProcessor.isAuthorized(authProvider);
    }
  }
}

class ChainAuthenticationProcessor {
  static getProcessor() {
    const userpasswordProcessor = new UserpasswordAuthenticationProcessor();
    const oAuthProcessor = new OAuthAuthenticationProcessor();
    userpasswordProcessor.setNextProcessor(oAuthProcessor);
    return userpasswordProcessor;
  }
}

const OAuth: OAuthProvider = {
  type: "OAuth"
};

const userPass: UserpasswordProvider = {
  type: "Userpassword"
}

const chainAuthenticationProcessor = ChainAuthenticationProcessor.getProcessor();
chainAuthenticationProcessor.isAuthorized(userPass);



