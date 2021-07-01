var UserProfile = (function() {
    var user_email = "";
    var user_name = "";
  
    var getEmail = function() {
      return user_email;    // Or pull this from cookie/localStorage
    };
  
    var setEmail = function(email) {
      user_email = email;     
      // Also set this in cookie/localStorage
    };

    var getName = function() {
      return user_name;
    };

    var setName = function(name) {
      user_name = name;
    }
  
    return {
      getEmail: getEmail,
      setEmail: setEmail,
      setName: setName,
      getName: getName
    }
  
  })();

export default UserProfile;