"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MexicoHat = function (_THREE$Geometry) {
  _inherits(MexicoHat, _THREE$Geometry);

  function MexicoHat() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.0;

    var _this, _ret;

    var pts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;

    _classCallCheck(this, MexicoHat);

    var nRows = pts;
    var nColumns = pts;

    // create new geometry as mexicoHatGeometry
    var mexicoHatGeometry = (_this = _possibleConstructorReturn(this, (MexicoHat.__proto__ || Object.getPrototypeOf(MexicoHat)).call(this)), _this);

    // generat the y-axis points for using
    var mexicoHatData = new Array(nRows);

    for (var i = 0; i < nRows; i++) {
      mexicoHatData[i] = new Array(nColumns);
      var x = Math.PI * (4 * i / nRows - 2.0);
      for (var j = 0; j < nColumns; j++) {
        var y = Math.PI * (4 * j / nRows - 2.0);
        var r = Math.sqrt(x * x + y * y);

        // take care of 0/0 for r = 0

        if (r) mexicoHatData[i][j] = Math.sin(r) / r * size;else mexicoHatData[i][j] = size;
      }
    }

    // set start position
    // mexicoHatGeometry.vertices.push(new THREE.Vector3(0, 0, 0));

    // loop to generate points
    for (var i = 0; i < nRows; i++) {
      for (var j = 0; j < nColumns; j++) {
        mexicoHatGeometry.vertices.push(new THREE.Vector3(2 * size * i / nRows - size, mexicoHatData[i][j], 2 * size * j / nColumns - size));
      }
    }

    // loop to generate faces
    for (var i = 0; i < nRows - 1; i++) {
      for (var j = 0; j < nColumns - 1; j++) {
        mexicoHatGeometry.faces.push(new THREE.Face3(i * nColumns + j, i * nColumns + (j + 1), (i + 1) * nColumns + (j + 1)));
        mexicoHatGeometry.faces.push(new THREE.Face3(i * nColumns + j, (i + 1) * nColumns + (j + 1), (i + 1) * nColumns + j));
      }
    }

    mexicoHatGeometry.computeFaceNormals();
    mexicoHatGeometry.computeVertexNormals();

    return _ret = mexicoHatGeometry, _possibleConstructorReturn(_this, _ret);
  }

  return MexicoHat;
}(THREE.Geometry);