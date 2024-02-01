function removeKeys(obj, checker) {
	if (typeof obj !== 'object' || obj === null) {
	  return obj
	}
  
	if (Array.isArray(obj)) {
	  for (let i = 0; i < obj.length; i++) {
		obj[i] = removeKeys(obj[i], checker)
	  }
	} else {
	  for (let prop in obj) {
		if (obj.hasOwnProperty(prop)) {
		  if (checker(prop, obj[prop])) {
			delete obj[prop]
		  } else {
			obj[prop] = removeKeys(obj[prop], checker)
		  }
		}
	  }
	}
  
	return obj;
}