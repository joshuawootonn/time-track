/****************************************************************************
** Meta object code from reading C++ file 'shifteditform.h'
**
** Created by: The Qt Meta Object Compiler version 67 (Qt 5.9.0)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../../Source/Time-Track/shifteditform.h"
#include <QtCore/qbytearray.h>
#include <QtCore/qmetatype.h>
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'shifteditform.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 67
#error "This file was generated using the moc from 5.9.0. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
QT_WARNING_PUSH
QT_WARNING_DISABLE_DEPRECATED
struct qt_meta_stringdata_ShiftEditForm_t {
    QByteArrayData data[19];
    char stringdata0[350];
};
#define QT_MOC_LITERAL(idx, ofs, len) \
    Q_STATIC_BYTE_ARRAY_DATA_HEADER_INITIALIZER_WITH_OFFSET(len, \
    qptrdiff(offsetof(qt_meta_stringdata_ShiftEditForm_t, stringdata0) + ofs \
        - idx * sizeof(QByteArrayData)) \
    )
static const qt_meta_stringdata_ShiftEditForm_t qt_meta_stringdata_ShiftEditForm = {
    {
QT_MOC_LITERAL(0, 0, 13), // "ShiftEditForm"
QT_MOC_LITERAL(1, 14, 8), // "finished"
QT_MOC_LITERAL(2, 23, 0), // ""
QT_MOC_LITERAL(3, 24, 31), // "on_Projects_currentIndexChanged"
QT_MOC_LITERAL(4, 56, 4), // "arg1"
QT_MOC_LITERAL(5, 61, 14), // "on_Add_clicked"
QT_MOC_LITERAL(6, 76, 17), // "on_Delete_clicked"
QT_MOC_LITERAL(7, 94, 23), // "on_Sections_cellClicked"
QT_MOC_LITERAL(8, 118, 3), // "row"
QT_MOC_LITERAL(9, 122, 6), // "column"
QT_MOC_LITERAL(10, 129, 23), // "on_Sections_cellChanged"
QT_MOC_LITERAL(11, 153, 27), // "on_Lunch_currentTextChanged"
QT_MOC_LITERAL(12, 181, 28), // "on_DateTime1_dateTimeChanged"
QT_MOC_LITERAL(13, 210, 8), // "dateTime"
QT_MOC_LITERAL(14, 219, 28), // "on_DateTime2_dateTimeChanged"
QT_MOC_LITERAL(15, 248, 26), // "on_Description_textChanged"
QT_MOC_LITERAL(16, 275, 25), // "on_FinishedButton_clicked"
QT_MOC_LITERAL(17, 301, 23), // "on_CancelButton_clicked"
QT_MOC_LITERAL(18, 325, 24) // "on_RefreshButton_clicked"

    },
    "ShiftEditForm\0finished\0\0"
    "on_Projects_currentIndexChanged\0arg1\0"
    "on_Add_clicked\0on_Delete_clicked\0"
    "on_Sections_cellClicked\0row\0column\0"
    "on_Sections_cellChanged\0"
    "on_Lunch_currentTextChanged\0"
    "on_DateTime1_dateTimeChanged\0dateTime\0"
    "on_DateTime2_dateTimeChanged\0"
    "on_Description_textChanged\0"
    "on_FinishedButton_clicked\0"
    "on_CancelButton_clicked\0"
    "on_RefreshButton_clicked"
};
#undef QT_MOC_LITERAL

static const uint qt_meta_data_ShiftEditForm[] = {

 // content:
       7,       // revision
       0,       // classname
       0,    0, // classinfo
      13,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       1,       // signalCount

 // signals: name, argc, parameters, tag, flags
       1,    0,   79,    2, 0x06 /* Public */,

 // slots: name, argc, parameters, tag, flags
       3,    1,   80,    2, 0x08 /* Private */,
       5,    0,   83,    2, 0x08 /* Private */,
       6,    0,   84,    2, 0x08 /* Private */,
       7,    2,   85,    2, 0x08 /* Private */,
      10,    0,   90,    2, 0x08 /* Private */,
      11,    1,   91,    2, 0x08 /* Private */,
      12,    1,   94,    2, 0x08 /* Private */,
      14,    1,   97,    2, 0x08 /* Private */,
      15,    0,  100,    2, 0x08 /* Private */,
      16,    0,  101,    2, 0x08 /* Private */,
      17,    0,  102,    2, 0x08 /* Private */,
      18,    0,  103,    2, 0x08 /* Private */,

 // signals: parameters
    QMetaType::Void,

 // slots: parameters
    QMetaType::Void, QMetaType::QString,    4,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Int, QMetaType::Int,    8,    9,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QString,    4,
    QMetaType::Void, QMetaType::QDateTime,   13,
    QMetaType::Void, QMetaType::QDateTime,   13,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,

       0        // eod
};

void ShiftEditForm::qt_static_metacall(QObject *_o, QMetaObject::Call _c, int _id, void **_a)
{
    if (_c == QMetaObject::InvokeMetaMethod) {
        ShiftEditForm *_t = static_cast<ShiftEditForm *>(_o);
        Q_UNUSED(_t)
        switch (_id) {
        case 0: _t->finished(); break;
        case 1: _t->on_Projects_currentIndexChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 2: _t->on_Add_clicked(); break;
        case 3: _t->on_Delete_clicked(); break;
        case 4: _t->on_Sections_cellClicked((*reinterpret_cast< int(*)>(_a[1])),(*reinterpret_cast< int(*)>(_a[2]))); break;
        case 5: _t->on_Sections_cellChanged(); break;
        case 6: _t->on_Lunch_currentTextChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 7: _t->on_DateTime1_dateTimeChanged((*reinterpret_cast< const QDateTime(*)>(_a[1]))); break;
        case 8: _t->on_DateTime2_dateTimeChanged((*reinterpret_cast< const QDateTime(*)>(_a[1]))); break;
        case 9: _t->on_Description_textChanged(); break;
        case 10: _t->on_FinishedButton_clicked(); break;
        case 11: _t->on_CancelButton_clicked(); break;
        case 12: _t->on_RefreshButton_clicked(); break;
        default: ;
        }
    } else if (_c == QMetaObject::IndexOfMethod) {
        int *result = reinterpret_cast<int *>(_a[0]);
        void **func = reinterpret_cast<void **>(_a[1]);
        {
            typedef void (ShiftEditForm::*_t)();
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&ShiftEditForm::finished)) {
                *result = 0;
                return;
            }
        }
    }
}

const QMetaObject ShiftEditForm::staticMetaObject = {
    { &QDialog::staticMetaObject, qt_meta_stringdata_ShiftEditForm.data,
      qt_meta_data_ShiftEditForm,  qt_static_metacall, nullptr, nullptr}
};


const QMetaObject *ShiftEditForm::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->dynamicMetaObject() : &staticMetaObject;
}

void *ShiftEditForm::qt_metacast(const char *_clname)
{
    if (!_clname) return nullptr;
    if (!strcmp(_clname, qt_meta_stringdata_ShiftEditForm.stringdata0))
        return static_cast<void*>(const_cast< ShiftEditForm*>(this));
    return QDialog::qt_metacast(_clname);
}

int ShiftEditForm::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QDialog::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        if (_id < 13)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 13;
    } else if (_c == QMetaObject::RegisterMethodArgumentMetaType) {
        if (_id < 13)
            *reinterpret_cast<int*>(_a[0]) = -1;
        _id -= 13;
    }
    return _id;
}

// SIGNAL 0
void ShiftEditForm::finished()
{
    QMetaObject::activate(this, &staticMetaObject, 0, nullptr);
}
QT_WARNING_POP
QT_END_MOC_NAMESPACE
