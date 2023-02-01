// var ref = require('ref');
// var ffi = require('ffi');
import ffi from 'ffi-napi';
import ref from 'ref-napi'

export const testWin32 = () => {
  var voidPtr = ref.refType(ref.types.void);
  var stringPtr = ref.refType(ref.types.CString);

  var user32 = ffi.Library('user32.dll', {
      EnumWindows: ['bool', [voidPtr, 'int32']],
      GetWindowTextA : ['long', ['long', stringPtr, 'long']]
  });

  const windowProc = ffi.Callback('bool', ['long', 'int32'], function(hwnd, lParam) {
    var buf, name, ret;
    buf = new Buffer(255);
    // @ts-ignore
    ret = user32.GetWindowTextA(hwnd, buf, 255);
    name = ref.readCString(buf, 0);
    console.log(name);
    return true;
  });

  // @ts-ignore
  user32.EnumWindows(windowProc, 0);
}

