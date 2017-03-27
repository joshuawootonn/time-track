/****************************************************************************
** Meta object code from reading C++ file 'shifteditform.h'
**
** Created by: The Qt Meta Object Compiler version 67 (Qt 5.7.0)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../../AACI V2/Labor-Tracker/shifteditform.h"
#include <QtCore/qbytearray.h>
#include <QtCore/qmetatype.h>
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'shifteditform.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 67
#error "This file was generated using the moc from 5.7.0. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
struct qt_meta_stringdata_ShiftEditForm_t {
    QByteArrayData data[18];
    char stringdata0[314];
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
QT_MOC_LITERAL(3, 24, 25), // "on_FinishedButton_clicked"
QT_MOC_LITERAL(4, 50, 31), // "on_Projects_currentIndexChanged"
QT_MOC_LITERAL(5, 82, 14), // "on_Add_clicked"
QT_MOC_LITERAL(6, 97, 15), // "on_Edit_clicked"
QT_MOC_LITERAL(7, 113, 17), // "on_Delete_clicked"
QT_MOC_LITERAL(8, 131, 23), // "on_Sections_cellClicked"
QT_MOC_LITERAL(9, 155, 3), // "row"
QT_MOC_LITERAL(10, 159, 6), // "column"
QT_MOC_LITERAL(11, 166, 23), // "on_Sections_cellChanged"
QT_MOC_LITERAL(12, 190, 23), // "on_CancelButton_clicked"
QT_MOC_LITERAL(13, 214, 27), // "on_Lunch_currentTextChanged"
QT_MOC_LITERAL(14, 242, 4), // "arg1"
QT_MOC_LITERAL(15, 247, 28), // "on_DateTime1_dateTimeChanged"
QT_MOC_LITERAL(16, 276, 8), // "dateTime"
QT_MOC_LITERAL(17, 285, 28) // "on_DateTime2_dateTimeChanged"

    },
    "ShiftEditForm\0finished\0\0"
    "on_FinishedButton_clicked\0"
    "on_Projects_currentIndexChanged\0"
    "on_Add_clicked\0on_Edit_clicked\0"
    "on_Delete_clicked\0on_Sections_cellClicked\0"
    "row\0column\0on_Sections_cellChanged\0"
    "on_CancelButton_clicked\0"
    "on_Lunch_currentTextChanged\0arg1\0"
    "on_DateTime1_dateTimeChanged\0dateTime\0"
    "on_DateTime2_dateTimeChanged"
};
#undef QT_MOC_LITERAL

static const uint qt_meta_data_ShiftEditForm[] = {

 // content:
       7,       // revision
       0,       // classname
       0,    0, // classinfo
      12,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       1,       // signalCount

 // signals: name, argc, parameters, tag, flags
       1,    0,   74,    2, 0x06 /* Public */,

 // slots: name, argc, parameters, tag, flags
       3,    0,   75,    2, 0x08 /* Private */,
       4,    0,   76,    2, 0x08 /* Private */,
       5,    0,   77,    2, 0x08 /* Private */,
       6,    0,   78,    2, 0x08 /* Private */,
       7,    0,   79,    2, 0x08 /* Private */,
       8,    2,   80,    2, 0x08 /* Private */,
      11,    0,   85,    2, 0x08 /* Private */,
      12,    0,   86,    2, 0x08 /* Private */,
      13,    1,   87,    2, 0x08 /* Private */,
      15,    1,   90,    2, 0x08 /* Private */,
      17,    1,   93,    2, 0x08 /* Private */,

 // signals: parameters
    QMetaType::Void,

 // slots: parameters
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Int, QMetaType::Int,    9,   10,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QString,   14,
    QMetaType::Void, QMetaType::QDateTime,   16,
    QMetaType::Void, QMetaType::QDateTime,   16,

       0        // eod
};

void ShiftEditForm::qt_static_metacall(QObject *_o, QMetaObject::Call _c, int _id, void **_a)
{
    if (_c == QMetaObject::InvokeMetaMethod) {
        ShiftEditForm *_t = static_cast<ShiftEditForm *>(_o);
        Q_UNUSED(_t)
        switch (_id) {
        case 0: _t->finished(); break;
        case 1: _t->on_FinishedButton_clicked(); break;
        case 2: _t->on_Projects_currentIndexChanged(); break;
        case 3: _t->on_Add_clicked(); break;
        case 4: _t->on_Edit_clicked(); break;
        case 5: _t->on_Delete_clicked(); break;
        case 6: _t->on_Sections_cellClicked((*reinterpret_cast< int(*)>(_a[1])),(*reinterpret_cast< int(*)>(_a[2]))); break;
        case 7: _t->on_Sections_cellChanged(); break;
        case 8: _t->on_CancelButton_clicked(); break;
        case 9: _t->on_Lunch_currentTextChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 10: _t->on_DateTime1_dateTimeChanged((*reinterpret_cast< const QDateTime(*)>(_a[1]))); break;
        case 11: _t->on_DateTime2_dateTimeChanged((*reinterpret_cast< const QDateTime(*)>(_a[1]))); break;
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
      qt_meta_data_ShiftEditForm,  qt_static_metacall, Q_NULLPTR, Q_NULLPTR}
};


const QMetaObject *ShiftEditForm::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->dynamicMetaObject() : &staticMetaObject;
}

void *ShiftEditForm::qt_metacast(const char *_clname)
{
    if (!_clname) return Q_NULLPTR;
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
        if (_id < 12)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 12;
    } else if (_c == QMetaObject::RegisterMethodArgumentMetaType) {
        if (_id < 12)
            *reinterpret_cast<int*>(_a[0]) = -1;
        _id -= 12;
    }
    return _id;
}

// SIGNAL 0
void ShiftEditForm::finished()
{
    QMetaObject::activate(this, &staticMetaObject, 0, Q_NULLPTR);
}
QT_END_MOC_NAMESPACE
