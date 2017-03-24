/****************************************************************************
** Meta object code from reading C++ file 'mainwindow.h'
**
** Created by: The Qt Meta Object Compiler version 67 (Qt 5.7.0)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../../AACI-Labor-Tracking/mainwindow.h"
#include <QtCore/qbytearray.h>
#include <QtCore/qmetatype.h>
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'mainwindow.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 67
#error "This file was generated using the moc from 5.7.0. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
struct qt_meta_stringdata_MainWindow_t {
    QByteArrayData data[198];
    char stringdata0[6533];
};
#define QT_MOC_LITERAL(idx, ofs, len) \
    Q_STATIC_BYTE_ARRAY_DATA_HEADER_INITIALIZER_WITH_OFFSET(len, \
    qptrdiff(offsetof(qt_meta_stringdata_MainWindow_t, stringdata0) + ofs \
        - idx * sizeof(QByteArrayData)) \
    )
static const qt_meta_stringdata_MainWindow_t qt_meta_stringdata_MainWindow = {
    {
QT_MOC_LITERAL(0, 0, 10), // "MainWindow"
QT_MOC_LITERAL(1, 11, 18), // "close_input_dialog"
QT_MOC_LITERAL(2, 30, 0), // ""
QT_MOC_LITERAL(3, 31, 16), // "when_idle_for_30"
QT_MOC_LITERAL(4, 48, 11), // "when_active"
QT_MOC_LITERAL(5, 60, 15), // "loginInitialize"
QT_MOC_LITERAL(6, 76, 29), // "on_login_edit_editingFinished"
QT_MOC_LITERAL(7, 106, 29), // "on_login_enter_button_clicked"
QT_MOC_LITERAL(8, 136, 25), // "on_admin_finished_clicked"
QT_MOC_LITERAL(9, 162, 24), // "on_admin_clockin_clicked"
QT_MOC_LITERAL(10, 187, 25), // "on_admin_clockout_clicked"
QT_MOC_LITERAL(11, 213, 26), // "on_admin_terminate_clicked"
QT_MOC_LITERAL(12, 240, 33), // "on_admin_clockin5hoursago_cli..."
QT_MOC_LITERAL(13, 274, 22), // "on_admin_reset_clicked"
QT_MOC_LITERAL(14, 297, 24), // "on_admin_analyze_clicked"
QT_MOC_LITERAL(15, 322, 36), // "on_admin_employee_list_table_..."
QT_MOC_LITERAL(16, 359, 35), // "on_admin_project_list_table_p..."
QT_MOC_LITERAL(17, 395, 28), // "on_employee_finished_clicked"
QT_MOC_LITERAL(18, 424, 27), // "on_employee_clockin_clicked"
QT_MOC_LITERAL(19, 452, 28), // "on_employee_clockout_clicked"
QT_MOC_LITERAL(20, 481, 30), // "on_employee_slider_sliderMoved"
QT_MOC_LITERAL(21, 512, 8), // "position"
QT_MOC_LITERAL(22, 521, 49), // "on_analyze_project_list_combo..."
QT_MOC_LITERAL(23, 571, 4), // "arg1"
QT_MOC_LITERAL(24, 576, 44), // "on_analyze_project_combo_curr..."
QT_MOC_LITERAL(25, 621, 35), // "on_Employee_page_table1_cellP..."
QT_MOC_LITERAL(26, 657, 3), // "row"
QT_MOC_LITERAL(27, 661, 6), // "column"
QT_MOC_LITERAL(28, 668, 35), // "on_Employee_page_table2_cellP..."
QT_MOC_LITERAL(29, 704, 31), // "on_Employee_page_finish_clicked"
QT_MOC_LITERAL(30, 736, 32), // "on_employee_add_employee_clicked"
QT_MOC_LITERAL(31, 769, 24), // "ShowContextMenuEmployee1"
QT_MOC_LITERAL(32, 794, 3), // "pos"
QT_MOC_LITERAL(33, 798, 24), // "ShowContextMenuEmployee2"
QT_MOC_LITERAL(34, 823, 34), // "on_Project_page_table1_cellPr..."
QT_MOC_LITERAL(35, 858, 34), // "on_Project_page_table2_cellPr..."
QT_MOC_LITERAL(36, 893, 38), // "on_project_p_combo_currentInd..."
QT_MOC_LITERAL(37, 932, 39), // "on_project_p_combo2_currentIn..."
QT_MOC_LITERAL(38, 972, 30), // "on_Project_page_finish_clicked"
QT_MOC_LITERAL(39, 1003, 30), // "on_project_add_project_clicked"
QT_MOC_LITERAL(40, 1034, 27), // "on_project_add_item_clicked"
QT_MOC_LITERAL(41, 1062, 23), // "ShowContextMenuProject1"
QT_MOC_LITERAL(42, 1086, 23), // "ShowContextMenuProject2"
QT_MOC_LITERAL(43, 1110, 36), // "on_shiftedit_finished_adding_..."
QT_MOC_LITERAL(44, 1147, 37), // "on_shiftedit_finished_editing..."
QT_MOC_LITERAL(45, 1185, 27), // "on_shiftedit_cancel_clicked"
QT_MOC_LITERAL(46, 1213, 38), // "on_shiftedit_datetime1_dateTi..."
QT_MOC_LITERAL(47, 1252, 8), // "dateTime"
QT_MOC_LITERAL(48, 1261, 38), // "on_shiftedit_datetime2_dateTi..."
QT_MOC_LITERAL(49, 1300, 35), // "on_shiftedit_checkBox1_stateC..."
QT_MOC_LITERAL(50, 1336, 28), // "update_shiftedit_combobox1_1"
QT_MOC_LITERAL(51, 1365, 44), // "on_shiftedit_comboBox1_1_curr..."
QT_MOC_LITERAL(52, 1410, 28), // "update_shiftedit_combobox1_2"
QT_MOC_LITERAL(53, 1439, 36), // "on_shiftedit_spinbox1_1_value..."
QT_MOC_LITERAL(54, 1476, 36), // "on_shiftedit_spinbox1_2_value..."
QT_MOC_LITERAL(55, 1513, 35), // "on_shiftedit_checkBox2_stateC..."
QT_MOC_LITERAL(56, 1549, 28), // "update_shiftedit_combobox2_1"
QT_MOC_LITERAL(57, 1578, 44), // "on_shiftedit_comboBox2_1_curr..."
QT_MOC_LITERAL(58, 1623, 28), // "update_shiftedit_combobox2_2"
QT_MOC_LITERAL(59, 1652, 36), // "on_shiftedit_spinbox2_1_value..."
QT_MOC_LITERAL(60, 1689, 36), // "on_shiftedit_spinbox2_2_value..."
QT_MOC_LITERAL(61, 1726, 35), // "on_shiftedit_checkBox3_stateC..."
QT_MOC_LITERAL(62, 1762, 28), // "update_shiftedit_combobox3_1"
QT_MOC_LITERAL(63, 1791, 44), // "on_shiftedit_comboBox3_1_curr..."
QT_MOC_LITERAL(64, 1836, 28), // "update_shiftedit_combobox3_2"
QT_MOC_LITERAL(65, 1865, 36), // "on_shiftedit_spinbox3_1_value..."
QT_MOC_LITERAL(66, 1902, 36), // "on_shiftedit_spinbox3_2_value..."
QT_MOC_LITERAL(67, 1939, 35), // "on_shiftedit_checkBox4_stateC..."
QT_MOC_LITERAL(68, 1975, 28), // "update_shiftedit_combobox4_1"
QT_MOC_LITERAL(69, 2004, 44), // "on_shiftedit_comboBox4_1_curr..."
QT_MOC_LITERAL(70, 2049, 28), // "update_shiftedit_combobox4_2"
QT_MOC_LITERAL(71, 2078, 36), // "on_shiftedit_spinbox4_1_value..."
QT_MOC_LITERAL(72, 2115, 36), // "on_shiftedit_spinbox4_2_value..."
QT_MOC_LITERAL(73, 2152, 35), // "on_shiftedit_checkBox5_stateC..."
QT_MOC_LITERAL(74, 2188, 28), // "update_shiftedit_combobox5_1"
QT_MOC_LITERAL(75, 2217, 44), // "on_shiftedit_comboBox5_1_curr..."
QT_MOC_LITERAL(76, 2262, 28), // "update_shiftedit_combobox5_2"
QT_MOC_LITERAL(77, 2291, 36), // "on_shiftedit_spinbox5_1_value..."
QT_MOC_LITERAL(78, 2328, 36), // "on_shiftedit_spinbox5_2_value..."
QT_MOC_LITERAL(79, 2365, 35), // "on_shiftedit_checkBox6_stateC..."
QT_MOC_LITERAL(80, 2401, 28), // "update_shiftedit_combobox6_1"
QT_MOC_LITERAL(81, 2430, 44), // "on_shiftedit_comboBox6_1_curr..."
QT_MOC_LITERAL(82, 2475, 28), // "update_shiftedit_combobox6_2"
QT_MOC_LITERAL(83, 2504, 36), // "on_shiftedit_spinbox6_1_value..."
QT_MOC_LITERAL(84, 2541, 36), // "on_shiftedit_spinbox6_2_value..."
QT_MOC_LITERAL(85, 2578, 35), // "on_shiftedit_checkBox7_stateC..."
QT_MOC_LITERAL(86, 2614, 28), // "update_shiftedit_combobox7_1"
QT_MOC_LITERAL(87, 2643, 44), // "on_shiftedit_comboBox7_1_curr..."
QT_MOC_LITERAL(88, 2688, 28), // "update_shiftedit_combobox7_2"
QT_MOC_LITERAL(89, 2717, 36), // "on_shiftedit_spinbox7_1_value..."
QT_MOC_LITERAL(90, 2754, 36), // "on_shiftedit_spinbox7_2_value..."
QT_MOC_LITERAL(91, 2791, 35), // "on_shiftedit_checkBox8_stateC..."
QT_MOC_LITERAL(92, 2827, 28), // "update_shiftedit_combobox8_1"
QT_MOC_LITERAL(93, 2856, 44), // "on_shiftedit_comboBox8_1_curr..."
QT_MOC_LITERAL(94, 2901, 28), // "update_shiftedit_combobox8_2"
QT_MOC_LITERAL(95, 2930, 36), // "on_shiftedit_spinbox8_1_value..."
QT_MOC_LITERAL(96, 2967, 36), // "on_shiftedit_spinbox8_2_value..."
QT_MOC_LITERAL(97, 3004, 35), // "on_shiftedit_checkBox9_stateC..."
QT_MOC_LITERAL(98, 3040, 28), // "update_shiftedit_combobox9_1"
QT_MOC_LITERAL(99, 3069, 44), // "on_shiftedit_comboBox9_1_curr..."
QT_MOC_LITERAL(100, 3114, 28), // "update_shiftedit_combobox9_2"
QT_MOC_LITERAL(101, 3143, 36), // "on_shiftedit_spinbox9_1_value..."
QT_MOC_LITERAL(102, 3180, 36), // "on_shiftedit_spinbox9_2_value..."
QT_MOC_LITERAL(103, 3217, 36), // "on_shiftedit_checkBox10_state..."
QT_MOC_LITERAL(104, 3254, 29), // "update_shiftedit_combobox10_1"
QT_MOC_LITERAL(105, 3284, 45), // "on_shiftedit_comboBox10_1_cur..."
QT_MOC_LITERAL(106, 3330, 29), // "update_shiftedit_combobox10_2"
QT_MOC_LITERAL(107, 3360, 37), // "on_shiftedit_spinbox10_1_valu..."
QT_MOC_LITERAL(108, 3398, 37), // "on_shiftedit_spinbox10_2_valu..."
QT_MOC_LITERAL(109, 3436, 36), // "on_shiftedit_checkBox11_state..."
QT_MOC_LITERAL(110, 3473, 29), // "update_shiftedit_combobox11_1"
QT_MOC_LITERAL(111, 3503, 45), // "on_shiftedit_comboBox11_1_cur..."
QT_MOC_LITERAL(112, 3549, 29), // "update_shiftedit_combobox11_2"
QT_MOC_LITERAL(113, 3579, 37), // "on_shiftedit_spinbox11_1_valu..."
QT_MOC_LITERAL(114, 3617, 37), // "on_shiftedit_spinbox11_2_valu..."
QT_MOC_LITERAL(115, 3655, 36), // "on_shiftedit_checkBox12_state..."
QT_MOC_LITERAL(116, 3692, 29), // "update_shiftedit_combobox12_1"
QT_MOC_LITERAL(117, 3722, 45), // "on_shiftedit_comboBox12_1_cur..."
QT_MOC_LITERAL(118, 3768, 29), // "update_shiftedit_combobox12_2"
QT_MOC_LITERAL(119, 3798, 37), // "on_shiftedit_spinbox12_1_valu..."
QT_MOC_LITERAL(120, 3836, 37), // "on_shiftedit_spinbox12_2_valu..."
QT_MOC_LITERAL(121, 3874, 39), // "on_shiftedit_spinbox_lunch_va..."
QT_MOC_LITERAL(122, 3914, 28), // "on_clockout_finished_clicked"
QT_MOC_LITERAL(123, 3943, 26), // "on_clockout_cancel_clicked"
QT_MOC_LITERAL(124, 3970, 34), // "on_clockout_checkBox1_stateCh..."
QT_MOC_LITERAL(125, 4005, 27), // "update_clockout_comboBox1_1"
QT_MOC_LITERAL(126, 4033, 43), // "on_clockout_comboBox1_1_curre..."
QT_MOC_LITERAL(127, 4077, 27), // "update_clockout_comboBox1_2"
QT_MOC_LITERAL(128, 4105, 35), // "on_clockout_spinbox1_1_valueC..."
QT_MOC_LITERAL(129, 4141, 35), // "on_clockout_spinbox1_2_valueC..."
QT_MOC_LITERAL(130, 4177, 34), // "on_clockout_checkBox2_stateCh..."
QT_MOC_LITERAL(131, 4212, 27), // "update_clockout_comboBox2_1"
QT_MOC_LITERAL(132, 4240, 43), // "on_clockout_comboBox2_1_curre..."
QT_MOC_LITERAL(133, 4284, 27), // "update_clockout_comboBox2_2"
QT_MOC_LITERAL(134, 4312, 35), // "on_clockout_spinbox2_1_valueC..."
QT_MOC_LITERAL(135, 4348, 35), // "on_clockout_spinbox2_2_valueC..."
QT_MOC_LITERAL(136, 4384, 34), // "on_clockout_checkBox3_stateCh..."
QT_MOC_LITERAL(137, 4419, 27), // "update_clockout_comboBox3_1"
QT_MOC_LITERAL(138, 4447, 43), // "on_clockout_comboBox3_1_curre..."
QT_MOC_LITERAL(139, 4491, 27), // "update_clockout_comboBox3_2"
QT_MOC_LITERAL(140, 4519, 35), // "on_clockout_spinbox3_1_valueC..."
QT_MOC_LITERAL(141, 4555, 35), // "on_clockout_spinbox3_2_valueC..."
QT_MOC_LITERAL(142, 4591, 34), // "on_clockout_checkBox4_stateCh..."
QT_MOC_LITERAL(143, 4626, 27), // "update_clockout_comboBox4_1"
QT_MOC_LITERAL(144, 4654, 43), // "on_clockout_comboBox4_1_curre..."
QT_MOC_LITERAL(145, 4698, 27), // "update_clockout_comboBox4_2"
QT_MOC_LITERAL(146, 4726, 35), // "on_clockout_spinbox4_1_valueC..."
QT_MOC_LITERAL(147, 4762, 35), // "on_clockout_spinbox4_2_valueC..."
QT_MOC_LITERAL(148, 4798, 34), // "on_clockout_checkBox5_stateCh..."
QT_MOC_LITERAL(149, 4833, 27), // "update_clockout_comboBox5_1"
QT_MOC_LITERAL(150, 4861, 43), // "on_clockout_comboBox5_1_curre..."
QT_MOC_LITERAL(151, 4905, 27), // "update_clockout_comboBox5_2"
QT_MOC_LITERAL(152, 4933, 35), // "on_clockout_spinbox5_1_valueC..."
QT_MOC_LITERAL(153, 4969, 35), // "on_clockout_spinbox5_2_valueC..."
QT_MOC_LITERAL(154, 5005, 34), // "on_clockout_checkBox6_stateCh..."
QT_MOC_LITERAL(155, 5040, 27), // "update_clockout_comboBox6_1"
QT_MOC_LITERAL(156, 5068, 43), // "on_clockout_comboBox6_1_curre..."
QT_MOC_LITERAL(157, 5112, 27), // "update_clockout_comboBox6_2"
QT_MOC_LITERAL(158, 5140, 35), // "on_clockout_spinbox6_1_valueC..."
QT_MOC_LITERAL(159, 5176, 35), // "on_clockout_spinbox6_2_valueC..."
QT_MOC_LITERAL(160, 5212, 34), // "on_clockout_checkBox7_stateCh..."
QT_MOC_LITERAL(161, 5247, 27), // "update_clockout_comboBox7_1"
QT_MOC_LITERAL(162, 5275, 43), // "on_clockout_comboBox7_1_curre..."
QT_MOC_LITERAL(163, 5319, 27), // "update_clockout_comboBox7_2"
QT_MOC_LITERAL(164, 5347, 35), // "on_clockout_spinbox7_1_valueC..."
QT_MOC_LITERAL(165, 5383, 35), // "on_clockout_spinbox7_2_valueC..."
QT_MOC_LITERAL(166, 5419, 34), // "on_clockout_checkBox8_stateCh..."
QT_MOC_LITERAL(167, 5454, 27), // "update_clockout_comboBox8_1"
QT_MOC_LITERAL(168, 5482, 43), // "on_clockout_comboBox8_1_curre..."
QT_MOC_LITERAL(169, 5526, 27), // "update_clockout_comboBox8_2"
QT_MOC_LITERAL(170, 5554, 35), // "on_clockout_spinbox8_1_valueC..."
QT_MOC_LITERAL(171, 5590, 35), // "on_clockout_spinbox8_2_valueC..."
QT_MOC_LITERAL(172, 5626, 34), // "on_clockout_checkBox9_stateCh..."
QT_MOC_LITERAL(173, 5661, 27), // "update_clockout_comboBox9_1"
QT_MOC_LITERAL(174, 5689, 43), // "on_clockout_comboBox9_1_curre..."
QT_MOC_LITERAL(175, 5733, 27), // "update_clockout_comboBox9_2"
QT_MOC_LITERAL(176, 5761, 35), // "on_clockout_spinbox9_1_valueC..."
QT_MOC_LITERAL(177, 5797, 35), // "on_clockout_spinbox9_2_valueC..."
QT_MOC_LITERAL(178, 5833, 35), // "on_clockout_checkBox10_stateC..."
QT_MOC_LITERAL(179, 5869, 28), // "update_clockout_comboBox10_1"
QT_MOC_LITERAL(180, 5898, 44), // "on_clockout_comboBox10_1_curr..."
QT_MOC_LITERAL(181, 5943, 28), // "update_clockout_comboBox10_2"
QT_MOC_LITERAL(182, 5972, 36), // "on_clockout_spinbox10_1_value..."
QT_MOC_LITERAL(183, 6009, 36), // "on_clockout_spinbox10_2_value..."
QT_MOC_LITERAL(184, 6046, 35), // "on_clockout_checkBox11_stateC..."
QT_MOC_LITERAL(185, 6082, 28), // "update_clockout_comboBox11_1"
QT_MOC_LITERAL(186, 6111, 44), // "on_clockout_comboBox11_1_curr..."
QT_MOC_LITERAL(187, 6156, 28), // "update_clockout_comboBox11_2"
QT_MOC_LITERAL(188, 6185, 36), // "on_clockout_spinbox11_1_value..."
QT_MOC_LITERAL(189, 6222, 36), // "on_clockout_spinbox11_2_value..."
QT_MOC_LITERAL(190, 6259, 35), // "on_clockout_checkBox12_stateC..."
QT_MOC_LITERAL(191, 6295, 28), // "update_clockout_comboBox12_1"
QT_MOC_LITERAL(192, 6324, 44), // "on_clockout_comboBox12_1_curr..."
QT_MOC_LITERAL(193, 6369, 28), // "update_clockout_comboBox12_2"
QT_MOC_LITERAL(194, 6398, 36), // "on_clockout_spinbox12_1_value..."
QT_MOC_LITERAL(195, 6435, 36), // "on_clockout_spinbox12_2_value..."
QT_MOC_LITERAL(196, 6472, 38), // "on_clockout_spinbox_lunch_val..."
QT_MOC_LITERAL(197, 6511, 21) // "on_pushButton_clicked"

    },
    "MainWindow\0close_input_dialog\0\0"
    "when_idle_for_30\0when_active\0"
    "loginInitialize\0on_login_edit_editingFinished\0"
    "on_login_enter_button_clicked\0"
    "on_admin_finished_clicked\0"
    "on_admin_clockin_clicked\0"
    "on_admin_clockout_clicked\0"
    "on_admin_terminate_clicked\0"
    "on_admin_clockin5hoursago_clicked\0"
    "on_admin_reset_clicked\0on_admin_analyze_clicked\0"
    "on_admin_employee_list_table_pressed\0"
    "on_admin_project_list_table_pressed\0"
    "on_employee_finished_clicked\0"
    "on_employee_clockin_clicked\0"
    "on_employee_clockout_clicked\0"
    "on_employee_slider_sliderMoved\0position\0"
    "on_analyze_project_list_combo_currentIndexChanged\0"
    "arg1\0on_analyze_project_combo_currentIndexChanged\0"
    "on_Employee_page_table1_cellPressed\0"
    "row\0column\0on_Employee_page_table2_cellPressed\0"
    "on_Employee_page_finish_clicked\0"
    "on_employee_add_employee_clicked\0"
    "ShowContextMenuEmployee1\0pos\0"
    "ShowContextMenuEmployee2\0"
    "on_Project_page_table1_cellPressed\0"
    "on_Project_page_table2_cellPressed\0"
    "on_project_p_combo_currentIndexChanged\0"
    "on_project_p_combo2_currentIndexChanged\0"
    "on_Project_page_finish_clicked\0"
    "on_project_add_project_clicked\0"
    "on_project_add_item_clicked\0"
    "ShowContextMenuProject1\0ShowContextMenuProject2\0"
    "on_shiftedit_finished_adding_clicked\0"
    "on_shiftedit_finished_editing_clicked\0"
    "on_shiftedit_cancel_clicked\0"
    "on_shiftedit_datetime1_dateTimeChanged\0"
    "dateTime\0on_shiftedit_datetime2_dateTimeChanged\0"
    "on_shiftedit_checkBox1_stateChanged\0"
    "update_shiftedit_combobox1_1\0"
    "on_shiftedit_comboBox1_1_currentIndexChanged\0"
    "update_shiftedit_combobox1_2\0"
    "on_shiftedit_spinbox1_1_valueChanged\0"
    "on_shiftedit_spinbox1_2_valueChanged\0"
    "on_shiftedit_checkBox2_stateChanged\0"
    "update_shiftedit_combobox2_1\0"
    "on_shiftedit_comboBox2_1_currentIndexChanged\0"
    "update_shiftedit_combobox2_2\0"
    "on_shiftedit_spinbox2_1_valueChanged\0"
    "on_shiftedit_spinbox2_2_valueChanged\0"
    "on_shiftedit_checkBox3_stateChanged\0"
    "update_shiftedit_combobox3_1\0"
    "on_shiftedit_comboBox3_1_currentIndexChanged\0"
    "update_shiftedit_combobox3_2\0"
    "on_shiftedit_spinbox3_1_valueChanged\0"
    "on_shiftedit_spinbox3_2_valueChanged\0"
    "on_shiftedit_checkBox4_stateChanged\0"
    "update_shiftedit_combobox4_1\0"
    "on_shiftedit_comboBox4_1_currentIndexChanged\0"
    "update_shiftedit_combobox4_2\0"
    "on_shiftedit_spinbox4_1_valueChanged\0"
    "on_shiftedit_spinbox4_2_valueChanged\0"
    "on_shiftedit_checkBox5_stateChanged\0"
    "update_shiftedit_combobox5_1\0"
    "on_shiftedit_comboBox5_1_currentIndexChanged\0"
    "update_shiftedit_combobox5_2\0"
    "on_shiftedit_spinbox5_1_valueChanged\0"
    "on_shiftedit_spinbox5_2_valueChanged\0"
    "on_shiftedit_checkBox6_stateChanged\0"
    "update_shiftedit_combobox6_1\0"
    "on_shiftedit_comboBox6_1_currentIndexChanged\0"
    "update_shiftedit_combobox6_2\0"
    "on_shiftedit_spinbox6_1_valueChanged\0"
    "on_shiftedit_spinbox6_2_valueChanged\0"
    "on_shiftedit_checkBox7_stateChanged\0"
    "update_shiftedit_combobox7_1\0"
    "on_shiftedit_comboBox7_1_currentIndexChanged\0"
    "update_shiftedit_combobox7_2\0"
    "on_shiftedit_spinbox7_1_valueChanged\0"
    "on_shiftedit_spinbox7_2_valueChanged\0"
    "on_shiftedit_checkBox8_stateChanged\0"
    "update_shiftedit_combobox8_1\0"
    "on_shiftedit_comboBox8_1_currentIndexChanged\0"
    "update_shiftedit_combobox8_2\0"
    "on_shiftedit_spinbox8_1_valueChanged\0"
    "on_shiftedit_spinbox8_2_valueChanged\0"
    "on_shiftedit_checkBox9_stateChanged\0"
    "update_shiftedit_combobox9_1\0"
    "on_shiftedit_comboBox9_1_currentIndexChanged\0"
    "update_shiftedit_combobox9_2\0"
    "on_shiftedit_spinbox9_1_valueChanged\0"
    "on_shiftedit_spinbox9_2_valueChanged\0"
    "on_shiftedit_checkBox10_stateChanged\0"
    "update_shiftedit_combobox10_1\0"
    "on_shiftedit_comboBox10_1_currentIndexChanged\0"
    "update_shiftedit_combobox10_2\0"
    "on_shiftedit_spinbox10_1_valueChanged\0"
    "on_shiftedit_spinbox10_2_valueChanged\0"
    "on_shiftedit_checkBox11_stateChanged\0"
    "update_shiftedit_combobox11_1\0"
    "on_shiftedit_comboBox11_1_currentIndexChanged\0"
    "update_shiftedit_combobox11_2\0"
    "on_shiftedit_spinbox11_1_valueChanged\0"
    "on_shiftedit_spinbox11_2_valueChanged\0"
    "on_shiftedit_checkBox12_stateChanged\0"
    "update_shiftedit_combobox12_1\0"
    "on_shiftedit_comboBox12_1_currentIndexChanged\0"
    "update_shiftedit_combobox12_2\0"
    "on_shiftedit_spinbox12_1_valueChanged\0"
    "on_shiftedit_spinbox12_2_valueChanged\0"
    "on_shiftedit_spinbox_lunch_valueChanged\0"
    "on_clockout_finished_clicked\0"
    "on_clockout_cancel_clicked\0"
    "on_clockout_checkBox1_stateChanged\0"
    "update_clockout_comboBox1_1\0"
    "on_clockout_comboBox1_1_currentIndexChanged\0"
    "update_clockout_comboBox1_2\0"
    "on_clockout_spinbox1_1_valueChanged\0"
    "on_clockout_spinbox1_2_valueChanged\0"
    "on_clockout_checkBox2_stateChanged\0"
    "update_clockout_comboBox2_1\0"
    "on_clockout_comboBox2_1_currentIndexChanged\0"
    "update_clockout_comboBox2_2\0"
    "on_clockout_spinbox2_1_valueChanged\0"
    "on_clockout_spinbox2_2_valueChanged\0"
    "on_clockout_checkBox3_stateChanged\0"
    "update_clockout_comboBox3_1\0"
    "on_clockout_comboBox3_1_currentIndexChanged\0"
    "update_clockout_comboBox3_2\0"
    "on_clockout_spinbox3_1_valueChanged\0"
    "on_clockout_spinbox3_2_valueChanged\0"
    "on_clockout_checkBox4_stateChanged\0"
    "update_clockout_comboBox4_1\0"
    "on_clockout_comboBox4_1_currentIndexChanged\0"
    "update_clockout_comboBox4_2\0"
    "on_clockout_spinbox4_1_valueChanged\0"
    "on_clockout_spinbox4_2_valueChanged\0"
    "on_clockout_checkBox5_stateChanged\0"
    "update_clockout_comboBox5_1\0"
    "on_clockout_comboBox5_1_currentIndexChanged\0"
    "update_clockout_comboBox5_2\0"
    "on_clockout_spinbox5_1_valueChanged\0"
    "on_clockout_spinbox5_2_valueChanged\0"
    "on_clockout_checkBox6_stateChanged\0"
    "update_clockout_comboBox6_1\0"
    "on_clockout_comboBox6_1_currentIndexChanged\0"
    "update_clockout_comboBox6_2\0"
    "on_clockout_spinbox6_1_valueChanged\0"
    "on_clockout_spinbox6_2_valueChanged\0"
    "on_clockout_checkBox7_stateChanged\0"
    "update_clockout_comboBox7_1\0"
    "on_clockout_comboBox7_1_currentIndexChanged\0"
    "update_clockout_comboBox7_2\0"
    "on_clockout_spinbox7_1_valueChanged\0"
    "on_clockout_spinbox7_2_valueChanged\0"
    "on_clockout_checkBox8_stateChanged\0"
    "update_clockout_comboBox8_1\0"
    "on_clockout_comboBox8_1_currentIndexChanged\0"
    "update_clockout_comboBox8_2\0"
    "on_clockout_spinbox8_1_valueChanged\0"
    "on_clockout_spinbox8_2_valueChanged\0"
    "on_clockout_checkBox9_stateChanged\0"
    "update_clockout_comboBox9_1\0"
    "on_clockout_comboBox9_1_currentIndexChanged\0"
    "update_clockout_comboBox9_2\0"
    "on_clockout_spinbox9_1_valueChanged\0"
    "on_clockout_spinbox9_2_valueChanged\0"
    "on_clockout_checkBox10_stateChanged\0"
    "update_clockout_comboBox10_1\0"
    "on_clockout_comboBox10_1_currentIndexChanged\0"
    "update_clockout_comboBox10_2\0"
    "on_clockout_spinbox10_1_valueChanged\0"
    "on_clockout_spinbox10_2_valueChanged\0"
    "on_clockout_checkBox11_stateChanged\0"
    "update_clockout_comboBox11_1\0"
    "on_clockout_comboBox11_1_currentIndexChanged\0"
    "update_clockout_comboBox11_2\0"
    "on_clockout_spinbox11_1_valueChanged\0"
    "on_clockout_spinbox11_2_valueChanged\0"
    "on_clockout_checkBox12_stateChanged\0"
    "update_clockout_comboBox12_1\0"
    "on_clockout_comboBox12_1_currentIndexChanged\0"
    "update_clockout_comboBox12_2\0"
    "on_clockout_spinbox12_1_valueChanged\0"
    "on_clockout_spinbox12_2_valueChanged\0"
    "on_clockout_spinbox_lunch_valueChanged\0"
    "on_pushButton_clicked"
};
#undef QT_MOC_LITERAL

static const uint qt_meta_data_MainWindow[] = {

 // content:
       7,       // revision
       0,       // classname
       0,    0, // classinfo
     190,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // slots: name, argc, parameters, tag, flags
       1,    0,  964,    2, 0x08 /* Private */,
       3,    0,  965,    2, 0x08 /* Private */,
       4,    0,  966,    2, 0x08 /* Private */,
       5,    0,  967,    2, 0x08 /* Private */,
       6,    0,  968,    2, 0x08 /* Private */,
       7,    0,  969,    2, 0x08 /* Private */,
       8,    0,  970,    2, 0x08 /* Private */,
       9,    0,  971,    2, 0x08 /* Private */,
      10,    0,  972,    2, 0x08 /* Private */,
      11,    0,  973,    2, 0x08 /* Private */,
      12,    0,  974,    2, 0x08 /* Private */,
      13,    0,  975,    2, 0x08 /* Private */,
      14,    0,  976,    2, 0x08 /* Private */,
      15,    0,  977,    2, 0x08 /* Private */,
      16,    0,  978,    2, 0x08 /* Private */,
      17,    0,  979,    2, 0x08 /* Private */,
      18,    0,  980,    2, 0x08 /* Private */,
      19,    0,  981,    2, 0x08 /* Private */,
      20,    1,  982,    2, 0x08 /* Private */,
      22,    1,  985,    2, 0x08 /* Private */,
      24,    1,  988,    2, 0x08 /* Private */,
      25,    2,  991,    2, 0x08 /* Private */,
      28,    2,  996,    2, 0x08 /* Private */,
      29,    0, 1001,    2, 0x08 /* Private */,
      30,    0, 1002,    2, 0x08 /* Private */,
      31,    1, 1003,    2, 0x08 /* Private */,
      33,    1, 1006,    2, 0x08 /* Private */,
      34,    2, 1009,    2, 0x08 /* Private */,
      35,    2, 1014,    2, 0x08 /* Private */,
      36,    1, 1019,    2, 0x08 /* Private */,
      37,    1, 1022,    2, 0x08 /* Private */,
      38,    0, 1025,    2, 0x08 /* Private */,
      39,    0, 1026,    2, 0x08 /* Private */,
      40,    0, 1027,    2, 0x08 /* Private */,
      41,    1, 1028,    2, 0x08 /* Private */,
      42,    1, 1031,    2, 0x08 /* Private */,
      43,    0, 1034,    2, 0x08 /* Private */,
      44,    0, 1035,    2, 0x08 /* Private */,
      45,    0, 1036,    2, 0x08 /* Private */,
      46,    1, 1037,    2, 0x08 /* Private */,
      48,    1, 1040,    2, 0x08 /* Private */,
      49,    1, 1043,    2, 0x08 /* Private */,
      50,    0, 1046,    2, 0x08 /* Private */,
      51,    1, 1047,    2, 0x08 /* Private */,
      52,    0, 1050,    2, 0x08 /* Private */,
      53,    1, 1051,    2, 0x08 /* Private */,
      54,    1, 1054,    2, 0x08 /* Private */,
      55,    1, 1057,    2, 0x08 /* Private */,
      56,    0, 1060,    2, 0x08 /* Private */,
      57,    1, 1061,    2, 0x08 /* Private */,
      58,    0, 1064,    2, 0x08 /* Private */,
      59,    1, 1065,    2, 0x08 /* Private */,
      60,    1, 1068,    2, 0x08 /* Private */,
      61,    1, 1071,    2, 0x08 /* Private */,
      62,    0, 1074,    2, 0x08 /* Private */,
      63,    1, 1075,    2, 0x08 /* Private */,
      64,    0, 1078,    2, 0x08 /* Private */,
      65,    1, 1079,    2, 0x08 /* Private */,
      66,    1, 1082,    2, 0x08 /* Private */,
      67,    1, 1085,    2, 0x08 /* Private */,
      68,    0, 1088,    2, 0x08 /* Private */,
      69,    1, 1089,    2, 0x08 /* Private */,
      70,    0, 1092,    2, 0x08 /* Private */,
      71,    1, 1093,    2, 0x08 /* Private */,
      72,    1, 1096,    2, 0x08 /* Private */,
      73,    1, 1099,    2, 0x08 /* Private */,
      74,    0, 1102,    2, 0x08 /* Private */,
      75,    1, 1103,    2, 0x08 /* Private */,
      76,    0, 1106,    2, 0x08 /* Private */,
      77,    1, 1107,    2, 0x08 /* Private */,
      78,    1, 1110,    2, 0x08 /* Private */,
      79,    1, 1113,    2, 0x08 /* Private */,
      80,    0, 1116,    2, 0x08 /* Private */,
      81,    1, 1117,    2, 0x08 /* Private */,
      82,    0, 1120,    2, 0x08 /* Private */,
      83,    1, 1121,    2, 0x08 /* Private */,
      84,    1, 1124,    2, 0x08 /* Private */,
      85,    1, 1127,    2, 0x08 /* Private */,
      86,    0, 1130,    2, 0x08 /* Private */,
      87,    1, 1131,    2, 0x08 /* Private */,
      88,    0, 1134,    2, 0x08 /* Private */,
      89,    1, 1135,    2, 0x08 /* Private */,
      90,    1, 1138,    2, 0x08 /* Private */,
      91,    1, 1141,    2, 0x08 /* Private */,
      92,    0, 1144,    2, 0x08 /* Private */,
      93,    1, 1145,    2, 0x08 /* Private */,
      94,    0, 1148,    2, 0x08 /* Private */,
      95,    1, 1149,    2, 0x08 /* Private */,
      96,    1, 1152,    2, 0x08 /* Private */,
      97,    1, 1155,    2, 0x08 /* Private */,
      98,    0, 1158,    2, 0x08 /* Private */,
      99,    1, 1159,    2, 0x08 /* Private */,
     100,    0, 1162,    2, 0x08 /* Private */,
     101,    1, 1163,    2, 0x08 /* Private */,
     102,    1, 1166,    2, 0x08 /* Private */,
     103,    1, 1169,    2, 0x08 /* Private */,
     104,    0, 1172,    2, 0x08 /* Private */,
     105,    1, 1173,    2, 0x08 /* Private */,
     106,    0, 1176,    2, 0x08 /* Private */,
     107,    1, 1177,    2, 0x08 /* Private */,
     108,    1, 1180,    2, 0x08 /* Private */,
     109,    1, 1183,    2, 0x08 /* Private */,
     110,    0, 1186,    2, 0x08 /* Private */,
     111,    1, 1187,    2, 0x08 /* Private */,
     112,    0, 1190,    2, 0x08 /* Private */,
     113,    1, 1191,    2, 0x08 /* Private */,
     114,    1, 1194,    2, 0x08 /* Private */,
     115,    1, 1197,    2, 0x08 /* Private */,
     116,    0, 1200,    2, 0x08 /* Private */,
     117,    1, 1201,    2, 0x08 /* Private */,
     118,    0, 1204,    2, 0x08 /* Private */,
     119,    1, 1205,    2, 0x08 /* Private */,
     120,    1, 1208,    2, 0x08 /* Private */,
     121,    1, 1211,    2, 0x08 /* Private */,
     122,    0, 1214,    2, 0x08 /* Private */,
     123,    0, 1215,    2, 0x08 /* Private */,
     124,    1, 1216,    2, 0x08 /* Private */,
     125,    0, 1219,    2, 0x08 /* Private */,
     126,    1, 1220,    2, 0x08 /* Private */,
     127,    0, 1223,    2, 0x08 /* Private */,
     128,    1, 1224,    2, 0x08 /* Private */,
     129,    1, 1227,    2, 0x08 /* Private */,
     130,    1, 1230,    2, 0x08 /* Private */,
     131,    0, 1233,    2, 0x08 /* Private */,
     132,    1, 1234,    2, 0x08 /* Private */,
     133,    0, 1237,    2, 0x08 /* Private */,
     134,    1, 1238,    2, 0x08 /* Private */,
     135,    1, 1241,    2, 0x08 /* Private */,
     136,    1, 1244,    2, 0x08 /* Private */,
     137,    0, 1247,    2, 0x08 /* Private */,
     138,    1, 1248,    2, 0x08 /* Private */,
     139,    0, 1251,    2, 0x08 /* Private */,
     140,    1, 1252,    2, 0x08 /* Private */,
     141,    1, 1255,    2, 0x08 /* Private */,
     142,    1, 1258,    2, 0x08 /* Private */,
     143,    0, 1261,    2, 0x08 /* Private */,
     144,    1, 1262,    2, 0x08 /* Private */,
     145,    0, 1265,    2, 0x08 /* Private */,
     146,    1, 1266,    2, 0x08 /* Private */,
     147,    1, 1269,    2, 0x08 /* Private */,
     148,    1, 1272,    2, 0x08 /* Private */,
     149,    0, 1275,    2, 0x08 /* Private */,
     150,    1, 1276,    2, 0x08 /* Private */,
     151,    0, 1279,    2, 0x08 /* Private */,
     152,    1, 1280,    2, 0x08 /* Private */,
     153,    1, 1283,    2, 0x08 /* Private */,
     154,    1, 1286,    2, 0x08 /* Private */,
     155,    0, 1289,    2, 0x08 /* Private */,
     156,    1, 1290,    2, 0x08 /* Private */,
     157,    0, 1293,    2, 0x08 /* Private */,
     158,    1, 1294,    2, 0x08 /* Private */,
     159,    1, 1297,    2, 0x08 /* Private */,
     160,    1, 1300,    2, 0x08 /* Private */,
     161,    0, 1303,    2, 0x08 /* Private */,
     162,    1, 1304,    2, 0x08 /* Private */,
     163,    0, 1307,    2, 0x08 /* Private */,
     164,    1, 1308,    2, 0x08 /* Private */,
     165,    1, 1311,    2, 0x08 /* Private */,
     166,    1, 1314,    2, 0x08 /* Private */,
     167,    0, 1317,    2, 0x08 /* Private */,
     168,    1, 1318,    2, 0x08 /* Private */,
     169,    0, 1321,    2, 0x08 /* Private */,
     170,    1, 1322,    2, 0x08 /* Private */,
     171,    1, 1325,    2, 0x08 /* Private */,
     172,    1, 1328,    2, 0x08 /* Private */,
     173,    0, 1331,    2, 0x08 /* Private */,
     174,    1, 1332,    2, 0x08 /* Private */,
     175,    0, 1335,    2, 0x08 /* Private */,
     176,    1, 1336,    2, 0x08 /* Private */,
     177,    1, 1339,    2, 0x08 /* Private */,
     178,    1, 1342,    2, 0x08 /* Private */,
     179,    0, 1345,    2, 0x08 /* Private */,
     180,    1, 1346,    2, 0x08 /* Private */,
     181,    0, 1349,    2, 0x08 /* Private */,
     182,    1, 1350,    2, 0x08 /* Private */,
     183,    1, 1353,    2, 0x08 /* Private */,
     184,    1, 1356,    2, 0x08 /* Private */,
     185,    0, 1359,    2, 0x08 /* Private */,
     186,    1, 1360,    2, 0x08 /* Private */,
     187,    0, 1363,    2, 0x08 /* Private */,
     188,    1, 1364,    2, 0x08 /* Private */,
     189,    1, 1367,    2, 0x08 /* Private */,
     190,    1, 1370,    2, 0x08 /* Private */,
     191,    0, 1373,    2, 0x08 /* Private */,
     192,    1, 1374,    2, 0x08 /* Private */,
     193,    0, 1377,    2, 0x08 /* Private */,
     194,    1, 1378,    2, 0x08 /* Private */,
     195,    1, 1381,    2, 0x08 /* Private */,
     196,    1, 1384,    2, 0x08 /* Private */,
     197,    0, 1387,    2, 0x08 /* Private */,

 // slots: parameters
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Int,   21,
    QMetaType::Void, QMetaType::QString,   23,
    QMetaType::Void, QMetaType::QString,   23,
    QMetaType::Void, QMetaType::Int, QMetaType::Int,   26,   27,
    QMetaType::Void, QMetaType::Int, QMetaType::Int,   26,   27,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QPoint,   32,
    QMetaType::Void, QMetaType::QPoint,   32,
    QMetaType::Void, QMetaType::Int, QMetaType::Int,   26,   27,
    QMetaType::Void, QMetaType::Int, QMetaType::Int,   26,   27,
    QMetaType::Void, QMetaType::QString,   23,
    QMetaType::Void, QMetaType::QString,   23,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QPoint,   32,
    QMetaType::Void, QMetaType::QPoint,   32,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QDateTime,   47,
    QMetaType::Void, QMetaType::QDateTime,   47,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QString,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QString,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QString,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QString,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QString,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QString,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QString,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QString,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QString,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QString,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QString,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QString,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QString,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QString,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QString,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QString,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QString,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QString,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QString,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QString,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QString,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QString,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QString,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QString,   23,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void, QMetaType::Int,   23,
    QMetaType::Void,

       0        // eod
};

void MainWindow::qt_static_metacall(QObject *_o, QMetaObject::Call _c, int _id, void **_a)
{
    if (_c == QMetaObject::InvokeMetaMethod) {
        MainWindow *_t = static_cast<MainWindow *>(_o);
        Q_UNUSED(_t)
        switch (_id) {
        case 0: _t->close_input_dialog(); break;
        case 1: _t->when_idle_for_30(); break;
        case 2: _t->when_active(); break;
        case 3: _t->loginInitialize(); break;
        case 4: _t->on_login_edit_editingFinished(); break;
        case 5: _t->on_login_enter_button_clicked(); break;
        case 6: _t->on_admin_finished_clicked(); break;
        case 7: _t->on_admin_clockin_clicked(); break;
        case 8: _t->on_admin_clockout_clicked(); break;
        case 9: _t->on_admin_terminate_clicked(); break;
        case 10: _t->on_admin_clockin5hoursago_clicked(); break;
        case 11: _t->on_admin_reset_clicked(); break;
        case 12: _t->on_admin_analyze_clicked(); break;
        case 13: _t->on_admin_employee_list_table_pressed(); break;
        case 14: _t->on_admin_project_list_table_pressed(); break;
        case 15: _t->on_employee_finished_clicked(); break;
        case 16: _t->on_employee_clockin_clicked(); break;
        case 17: _t->on_employee_clockout_clicked(); break;
        case 18: _t->on_employee_slider_sliderMoved((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 19: _t->on_analyze_project_list_combo_currentIndexChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 20: _t->on_analyze_project_combo_currentIndexChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 21: _t->on_Employee_page_table1_cellPressed((*reinterpret_cast< int(*)>(_a[1])),(*reinterpret_cast< int(*)>(_a[2]))); break;
        case 22: _t->on_Employee_page_table2_cellPressed((*reinterpret_cast< int(*)>(_a[1])),(*reinterpret_cast< int(*)>(_a[2]))); break;
        case 23: _t->on_Employee_page_finish_clicked(); break;
        case 24: _t->on_employee_add_employee_clicked(); break;
        case 25: _t->ShowContextMenuEmployee1((*reinterpret_cast< const QPoint(*)>(_a[1]))); break;
        case 26: _t->ShowContextMenuEmployee2((*reinterpret_cast< const QPoint(*)>(_a[1]))); break;
        case 27: _t->on_Project_page_table1_cellPressed((*reinterpret_cast< int(*)>(_a[1])),(*reinterpret_cast< int(*)>(_a[2]))); break;
        case 28: _t->on_Project_page_table2_cellPressed((*reinterpret_cast< int(*)>(_a[1])),(*reinterpret_cast< int(*)>(_a[2]))); break;
        case 29: _t->on_project_p_combo_currentIndexChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 30: _t->on_project_p_combo2_currentIndexChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 31: _t->on_Project_page_finish_clicked(); break;
        case 32: _t->on_project_add_project_clicked(); break;
        case 33: _t->on_project_add_item_clicked(); break;
        case 34: _t->ShowContextMenuProject1((*reinterpret_cast< const QPoint(*)>(_a[1]))); break;
        case 35: _t->ShowContextMenuProject2((*reinterpret_cast< const QPoint(*)>(_a[1]))); break;
        case 36: _t->on_shiftedit_finished_adding_clicked(); break;
        case 37: _t->on_shiftedit_finished_editing_clicked(); break;
        case 38: _t->on_shiftedit_cancel_clicked(); break;
        case 39: _t->on_shiftedit_datetime1_dateTimeChanged((*reinterpret_cast< const QDateTime(*)>(_a[1]))); break;
        case 40: _t->on_shiftedit_datetime2_dateTimeChanged((*reinterpret_cast< const QDateTime(*)>(_a[1]))); break;
        case 41: _t->on_shiftedit_checkBox1_stateChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 42: _t->update_shiftedit_combobox1_1(); break;
        case 43: _t->on_shiftedit_comboBox1_1_currentIndexChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 44: _t->update_shiftedit_combobox1_2(); break;
        case 45: _t->on_shiftedit_spinbox1_1_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 46: _t->on_shiftedit_spinbox1_2_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 47: _t->on_shiftedit_checkBox2_stateChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 48: _t->update_shiftedit_combobox2_1(); break;
        case 49: _t->on_shiftedit_comboBox2_1_currentIndexChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 50: _t->update_shiftedit_combobox2_2(); break;
        case 51: _t->on_shiftedit_spinbox2_1_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 52: _t->on_shiftedit_spinbox2_2_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 53: _t->on_shiftedit_checkBox3_stateChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 54: _t->update_shiftedit_combobox3_1(); break;
        case 55: _t->on_shiftedit_comboBox3_1_currentIndexChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 56: _t->update_shiftedit_combobox3_2(); break;
        case 57: _t->on_shiftedit_spinbox3_1_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 58: _t->on_shiftedit_spinbox3_2_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 59: _t->on_shiftedit_checkBox4_stateChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 60: _t->update_shiftedit_combobox4_1(); break;
        case 61: _t->on_shiftedit_comboBox4_1_currentIndexChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 62: _t->update_shiftedit_combobox4_2(); break;
        case 63: _t->on_shiftedit_spinbox4_1_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 64: _t->on_shiftedit_spinbox4_2_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 65: _t->on_shiftedit_checkBox5_stateChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 66: _t->update_shiftedit_combobox5_1(); break;
        case 67: _t->on_shiftedit_comboBox5_1_currentIndexChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 68: _t->update_shiftedit_combobox5_2(); break;
        case 69: _t->on_shiftedit_spinbox5_1_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 70: _t->on_shiftedit_spinbox5_2_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 71: _t->on_shiftedit_checkBox6_stateChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 72: _t->update_shiftedit_combobox6_1(); break;
        case 73: _t->on_shiftedit_comboBox6_1_currentIndexChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 74: _t->update_shiftedit_combobox6_2(); break;
        case 75: _t->on_shiftedit_spinbox6_1_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 76: _t->on_shiftedit_spinbox6_2_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 77: _t->on_shiftedit_checkBox7_stateChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 78: _t->update_shiftedit_combobox7_1(); break;
        case 79: _t->on_shiftedit_comboBox7_1_currentIndexChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 80: _t->update_shiftedit_combobox7_2(); break;
        case 81: _t->on_shiftedit_spinbox7_1_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 82: _t->on_shiftedit_spinbox7_2_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 83: _t->on_shiftedit_checkBox8_stateChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 84: _t->update_shiftedit_combobox8_1(); break;
        case 85: _t->on_shiftedit_comboBox8_1_currentIndexChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 86: _t->update_shiftedit_combobox8_2(); break;
        case 87: _t->on_shiftedit_spinbox8_1_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 88: _t->on_shiftedit_spinbox8_2_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 89: _t->on_shiftedit_checkBox9_stateChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 90: _t->update_shiftedit_combobox9_1(); break;
        case 91: _t->on_shiftedit_comboBox9_1_currentIndexChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 92: _t->update_shiftedit_combobox9_2(); break;
        case 93: _t->on_shiftedit_spinbox9_1_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 94: _t->on_shiftedit_spinbox9_2_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 95: _t->on_shiftedit_checkBox10_stateChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 96: _t->update_shiftedit_combobox10_1(); break;
        case 97: _t->on_shiftedit_comboBox10_1_currentIndexChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 98: _t->update_shiftedit_combobox10_2(); break;
        case 99: _t->on_shiftedit_spinbox10_1_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 100: _t->on_shiftedit_spinbox10_2_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 101: _t->on_shiftedit_checkBox11_stateChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 102: _t->update_shiftedit_combobox11_1(); break;
        case 103: _t->on_shiftedit_comboBox11_1_currentIndexChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 104: _t->update_shiftedit_combobox11_2(); break;
        case 105: _t->on_shiftedit_spinbox11_1_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 106: _t->on_shiftedit_spinbox11_2_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 107: _t->on_shiftedit_checkBox12_stateChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 108: _t->update_shiftedit_combobox12_1(); break;
        case 109: _t->on_shiftedit_comboBox12_1_currentIndexChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 110: _t->update_shiftedit_combobox12_2(); break;
        case 111: _t->on_shiftedit_spinbox12_1_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 112: _t->on_shiftedit_spinbox12_2_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 113: _t->on_shiftedit_spinbox_lunch_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 114: _t->on_clockout_finished_clicked(); break;
        case 115: _t->on_clockout_cancel_clicked(); break;
        case 116: _t->on_clockout_checkBox1_stateChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 117: _t->update_clockout_comboBox1_1(); break;
        case 118: _t->on_clockout_comboBox1_1_currentIndexChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 119: _t->update_clockout_comboBox1_2(); break;
        case 120: _t->on_clockout_spinbox1_1_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 121: _t->on_clockout_spinbox1_2_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 122: _t->on_clockout_checkBox2_stateChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 123: _t->update_clockout_comboBox2_1(); break;
        case 124: _t->on_clockout_comboBox2_1_currentIndexChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 125: _t->update_clockout_comboBox2_2(); break;
        case 126: _t->on_clockout_spinbox2_1_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 127: _t->on_clockout_spinbox2_2_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 128: _t->on_clockout_checkBox3_stateChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 129: _t->update_clockout_comboBox3_1(); break;
        case 130: _t->on_clockout_comboBox3_1_currentIndexChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 131: _t->update_clockout_comboBox3_2(); break;
        case 132: _t->on_clockout_spinbox3_1_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 133: _t->on_clockout_spinbox3_2_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 134: _t->on_clockout_checkBox4_stateChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 135: _t->update_clockout_comboBox4_1(); break;
        case 136: _t->on_clockout_comboBox4_1_currentIndexChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 137: _t->update_clockout_comboBox4_2(); break;
        case 138: _t->on_clockout_spinbox4_1_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 139: _t->on_clockout_spinbox4_2_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 140: _t->on_clockout_checkBox5_stateChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 141: _t->update_clockout_comboBox5_1(); break;
        case 142: _t->on_clockout_comboBox5_1_currentIndexChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 143: _t->update_clockout_comboBox5_2(); break;
        case 144: _t->on_clockout_spinbox5_1_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 145: _t->on_clockout_spinbox5_2_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 146: _t->on_clockout_checkBox6_stateChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 147: _t->update_clockout_comboBox6_1(); break;
        case 148: _t->on_clockout_comboBox6_1_currentIndexChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 149: _t->update_clockout_comboBox6_2(); break;
        case 150: _t->on_clockout_spinbox6_1_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 151: _t->on_clockout_spinbox6_2_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 152: _t->on_clockout_checkBox7_stateChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 153: _t->update_clockout_comboBox7_1(); break;
        case 154: _t->on_clockout_comboBox7_1_currentIndexChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 155: _t->update_clockout_comboBox7_2(); break;
        case 156: _t->on_clockout_spinbox7_1_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 157: _t->on_clockout_spinbox7_2_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 158: _t->on_clockout_checkBox8_stateChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 159: _t->update_clockout_comboBox8_1(); break;
        case 160: _t->on_clockout_comboBox8_1_currentIndexChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 161: _t->update_clockout_comboBox8_2(); break;
        case 162: _t->on_clockout_spinbox8_1_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 163: _t->on_clockout_spinbox8_2_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 164: _t->on_clockout_checkBox9_stateChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 165: _t->update_clockout_comboBox9_1(); break;
        case 166: _t->on_clockout_comboBox9_1_currentIndexChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 167: _t->update_clockout_comboBox9_2(); break;
        case 168: _t->on_clockout_spinbox9_1_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 169: _t->on_clockout_spinbox9_2_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 170: _t->on_clockout_checkBox10_stateChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 171: _t->update_clockout_comboBox10_1(); break;
        case 172: _t->on_clockout_comboBox10_1_currentIndexChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 173: _t->update_clockout_comboBox10_2(); break;
        case 174: _t->on_clockout_spinbox10_1_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 175: _t->on_clockout_spinbox10_2_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 176: _t->on_clockout_checkBox11_stateChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 177: _t->update_clockout_comboBox11_1(); break;
        case 178: _t->on_clockout_comboBox11_1_currentIndexChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 179: _t->update_clockout_comboBox11_2(); break;
        case 180: _t->on_clockout_spinbox11_1_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 181: _t->on_clockout_spinbox11_2_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 182: _t->on_clockout_checkBox12_stateChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 183: _t->update_clockout_comboBox12_1(); break;
        case 184: _t->on_clockout_comboBox12_1_currentIndexChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 185: _t->update_clockout_comboBox12_2(); break;
        case 186: _t->on_clockout_spinbox12_1_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 187: _t->on_clockout_spinbox12_2_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 188: _t->on_clockout_spinbox_lunch_valueChanged((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 189: _t->on_pushButton_clicked(); break;
        default: ;
        }
    }
}

const QMetaObject MainWindow::staticMetaObject = {
    { &QMainWindow::staticMetaObject, qt_meta_stringdata_MainWindow.data,
      qt_meta_data_MainWindow,  qt_static_metacall, Q_NULLPTR, Q_NULLPTR}
};


const QMetaObject *MainWindow::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->dynamicMetaObject() : &staticMetaObject;
}

void *MainWindow::qt_metacast(const char *_clname)
{
    if (!_clname) return Q_NULLPTR;
    if (!strcmp(_clname, qt_meta_stringdata_MainWindow.stringdata0))
        return static_cast<void*>(const_cast< MainWindow*>(this));
    return QMainWindow::qt_metacast(_clname);
}

int MainWindow::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QMainWindow::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        if (_id < 190)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 190;
    } else if (_c == QMetaObject::RegisterMethodArgumentMetaType) {
        if (_id < 190)
            *reinterpret_cast<int*>(_a[0]) = -1;
        _id -= 190;
    }
    return _id;
}
QT_END_MOC_NAMESPACE
