/****************************************************************************
** Meta object code from reading C++ file 'exportform.h'
**
** Created by: The Qt Meta Object Compiler version 67 (Qt 5.9.1)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../exportform.h"
#include <QtCore/qbytearray.h>
#include <QtCore/qmetatype.h>
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'exportform.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 67
#error "This file was generated using the moc from 5.9.1. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
QT_WARNING_PUSH
QT_WARNING_DISABLE_DEPRECATED
struct qt_meta_stringdata_ExportForm_t {
    QByteArrayData data[8];
    char stringdata0[134];
};
#define QT_MOC_LITERAL(idx, ofs, len) \
    Q_STATIC_BYTE_ARRAY_DATA_HEADER_INITIALIZER_WITH_OFFSET(len, \
    qptrdiff(offsetof(qt_meta_stringdata_ExportForm_t, stringdata0) + ofs \
        - idx * sizeof(QByteArrayData)) \
    )
static const qt_meta_stringdata_ExportForm_t qt_meta_stringdata_ExportForm = {
    {
QT_MOC_LITERAL(0, 0, 10), // "ExportForm"
QT_MOC_LITERAL(1, 11, 5), // "excel"
QT_MOC_LITERAL(2, 17, 0), // ""
QT_MOC_LITERAL(3, 18, 30), // "on_ExcelLocationChange_clicked"
QT_MOC_LITERAL(4, 49, 21), // "on_buttonBox_accepted"
QT_MOC_LITERAL(5, 71, 18), // "EmployeeInitialize"
QT_MOC_LITERAL(6, 90, 38), // "on_ExcelTableChange_currentTe..."
QT_MOC_LITERAL(7, 129, 4) // "arg1"

    },
    "ExportForm\0excel\0\0on_ExcelLocationChange_clicked\0"
    "on_buttonBox_accepted\0EmployeeInitialize\0"
    "on_ExcelTableChange_currentTextChanged\0"
    "arg1"
};
#undef QT_MOC_LITERAL

static const uint qt_meta_data_ExportForm[] = {

 // content:
       7,       // revision
       0,       // classname
       0,    0, // classinfo
       5,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       1,       // signalCount

 // signals: name, argc, parameters, tag, flags
       1,    0,   39,    2, 0x06 /* Public */,

 // slots: name, argc, parameters, tag, flags
       3,    0,   40,    2, 0x08 /* Private */,
       4,    0,   41,    2, 0x08 /* Private */,
       5,    0,   42,    2, 0x08 /* Private */,
       6,    1,   43,    2, 0x08 /* Private */,

 // signals: parameters
    QMetaType::Void,

 // slots: parameters
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QString,    7,

       0        // eod
};

void ExportForm::qt_static_metacall(QObject *_o, QMetaObject::Call _c, int _id, void **_a)
{
    if (_c == QMetaObject::InvokeMetaMethod) {
        ExportForm *_t = static_cast<ExportForm *>(_o);
        Q_UNUSED(_t)
        switch (_id) {
        case 0: _t->excel(); break;
        case 1: _t->on_ExcelLocationChange_clicked(); break;
        case 2: _t->on_buttonBox_accepted(); break;
        case 3: _t->EmployeeInitialize(); break;
        case 4: _t->on_ExcelTableChange_currentTextChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        default: ;
        }
    } else if (_c == QMetaObject::IndexOfMethod) {
        int *result = reinterpret_cast<int *>(_a[0]);
        void **func = reinterpret_cast<void **>(_a[1]);
        {
            typedef void (ExportForm::*_t)();
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&ExportForm::excel)) {
                *result = 0;
                return;
            }
        }
    }
}

const QMetaObject ExportForm::staticMetaObject = {
    { &QDialog::staticMetaObject, qt_meta_stringdata_ExportForm.data,
      qt_meta_data_ExportForm,  qt_static_metacall, nullptr, nullptr}
};


const QMetaObject *ExportForm::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->dynamicMetaObject() : &staticMetaObject;
}

void *ExportForm::qt_metacast(const char *_clname)
{
    if (!_clname) return nullptr;
    if (!strcmp(_clname, qt_meta_stringdata_ExportForm.stringdata0))
        return static_cast<void*>(const_cast< ExportForm*>(this));
    return QDialog::qt_metacast(_clname);
}

int ExportForm::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QDialog::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        if (_id < 5)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 5;
    } else if (_c == QMetaObject::RegisterMethodArgumentMetaType) {
        if (_id < 5)
            *reinterpret_cast<int*>(_a[0]) = -1;
        _id -= 5;
    }
    return _id;
}

// SIGNAL 0
void ExportForm::excel()
{
    QMetaObject::activate(this, &staticMetaObject, 0, nullptr);
}
QT_WARNING_POP
QT_END_MOC_NAMESPACE
