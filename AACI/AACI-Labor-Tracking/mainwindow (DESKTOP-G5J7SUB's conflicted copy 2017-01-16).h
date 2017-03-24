#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QStackedWidget>
#include <QComboBox>
#include <QtSql>
#include <windows.h>
#include <QVariant>
#include <QWidget>
#include <QDesktopWidget>

namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT
public:


public:
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();

private slots:

    //Login
    void on_login_edit_editingFinished();


    //Admin
    void on_admin_finished_clicked();
    void on_admin_clockin_clicked();
    void on_admin_clockout_clicked();
    void on_admin_terminate_clicked();
    void on_admin_refresh_clicked();
    void on_admin_clockin5hoursago_clicked();
    void on_admin_reset_clicked();
    void on_admin_analyze_clicked();

        //Calendar
        void on_admin_calendar_clicked(const QDate &date);
        //Employee
        //void on_admin_employee_list_table_cellPressed(int row, int column);
        void on_admin_employee_list_table_pressed(const QModelIndex &index);
        void on_admin_el_add_clicked();
        void on_admin_el_del_clicked();
        void on_admin_el_save_clicked();
        //Project
        //void on_admin_project_list_table_cellClicked(int row, int column);
        void on_admin_project_list_table_pressed(const QModelIndex &index);
        void on_admin_pl_add_clicked();
        void on_admin_pl_save_clicked();
        void on_admin_pl_del_clicked();
        void on_admin_pl_arc_clicked();
        void on_admin_p_combo_currentIndexChanged(const QString &arg1);
        void on_admin_p_combo2_currentIndexChanged(const QString &arg1);
        void on_admin_p_add_clicked();
        void on_admin_p_del_clicked();
        void on_admin_project_table_cellClicked(int row, int column);


    //Employee
    void on_employee_finished_clicked();
    void on_employee_clockin_clicked();
    void on_employee_clockout_clicked();

        //Calendar
        void on_employee_calendar_clicked(const QDate &date);


     //Analyze
     void analyze_initialize();
     void analyze_update_times_table();


     void analyze_update_project_list_combo();
     void analyze_update_project_combo();
     void on_analyze_project_list_combo_currentIndexChanged(const QString &arg1);
     void on_analyze_project_combo_currentIndexChanged(const QString &arg1);










     //Employee page
     void employeePage_initialize();
     void update_employeePage_tables();
     void update_employee_page_table1();
     void update_employee_page_table2();

     void on_Employee_page_table1_cellPressed(int row, int column);
     void on_Employee_page_table2_cellPressed(int row, int column);

     void ShowContextMenuEmployee1(const QPoint& pos);
     void ShowContextMenuEmployee2(const QPoint& pos);
   

     void on_Employee_page_finish_clicked();







     //Project Page
     void projectPage_initialize();
     void update_projectPage_tables();
     void update_project_page_table1();
     void update_project_page_table2();

     void ShowContextMenuProject1(const QPoint& pos);
     void ShowContextMenuProject2(const QPoint& pos);

     void on_Project_page_finish_clicked();



     //Shiftedit
     void shiftedit_initialize(bool x);
     void shiftedit_length();
     void shiftedit_remain_length();
     void on_shiftedit_finished_adding_clicked();
     void on_shiftedit_finished_editing_clicked();
     void on_shiftedit_cancel_clicked();

     void on_shiftedit_datetime1_dateTimeChanged(const QDateTime &dateTime);
     void on_shiftedit_datetime2_dateTimeChanged(const QDateTime &dateTime);

     void on_shiftedit_checkBox1_stateChanged(int arg1);
     void update_shiftedit_combobox1_1();
     void on_shiftedit_comboBox1_1_currentIndexChanged(const QString &arg1);
     void update_shiftedit_combobox1_2();
     void on_shiftedit_spinbox1_1_valueChanged(int arg1);
     void on_shiftedit_spinbox1_2_valueChanged(int arg1);

     void on_shiftedit_checkBox2_stateChanged(int arg1);
     void update_shiftedit_combobox2_1();
     void on_shiftedit_comboBox2_1_currentIndexChanged(const QString &arg1);
     void update_shiftedit_combobox2_2();
     void on_shiftedit_spinbox2_1_valueChanged(int arg1);
     void on_shiftedit_spinbox2_2_valueChanged(int arg1);

     void on_shiftedit_checkBox3_stateChanged(int arg1);
     void update_shiftedit_combobox3_1();
     void on_shiftedit_comboBox3_1_currentIndexChanged(const QString &arg1);
     void update_shiftedit_combobox3_2();
     void on_shiftedit_spinbox3_1_valueChanged(int arg1);
     void on_shiftedit_spinbox3_2_valueChanged(int arg1);

     void on_shiftedit_checkBox4_stateChanged(int arg1);
     void update_shiftedit_combobox4_1();
     void on_shiftedit_comboBox4_1_currentIndexChanged(const QString &arg1);
     void update_shiftedit_combobox4_2();
     void on_shiftedit_spinbox4_1_valueChanged(int arg1);
     void on_shiftedit_spinbox4_2_valueChanged(int arg1);

     void on_shiftedit_checkBox5_stateChanged(int arg1);
     void update_shiftedit_combobox5_1();
     void on_shiftedit_comboBox5_1_currentIndexChanged(const QString &arg1);
     void update_shiftedit_combobox5_2();
     void on_shiftedit_spinbox5_1_valueChanged(int arg1);
     void on_shiftedit_spinbox5_2_valueChanged(int arg1);

     void on_shiftedit_checkBox6_stateChanged(int arg1);
     void update_shiftedit_combobox6_1();
     void on_shiftedit_comboBox6_1_currentIndexChanged(const QString &arg1);
     void update_shiftedit_combobox6_2();
     void on_shiftedit_spinbox6_1_valueChanged(int arg1);
     void on_shiftedit_spinbox6_2_valueChanged(int arg1);

     void on_shiftedit_checkBox7_stateChanged(int arg1);
     void update_shiftedit_combobox7_1();
     void on_shiftedit_comboBox7_1_currentIndexChanged(const QString &arg1);
     void update_shiftedit_combobox7_2();
     void on_shiftedit_spinbox7_1_valueChanged(int arg1);
     void on_shiftedit_spinbox7_2_valueChanged(int arg1);

     void on_shiftedit_checkBox8_stateChanged(int arg1);
     void update_shiftedit_combobox8_1();
     void on_shiftedit_comboBox8_1_currentIndexChanged(const QString &arg1);
     void update_shiftedit_combobox8_2();
     void on_shiftedit_spinbox8_1_valueChanged(int arg1);
     void on_shiftedit_spinbox8_2_valueChanged(int arg1);

     void on_shiftedit_checkBox9_stateChanged(int arg1);
     void update_shiftedit_combobox9_1();
     void on_shiftedit_comboBox9_1_currentIndexChanged(const QString &arg1);
     void update_shiftedit_combobox9_2();
     void on_shiftedit_spinbox9_1_valueChanged(int arg1);
     void on_shiftedit_spinbox9_2_valueChanged(int arg1);

     void on_shiftedit_checkBox10_stateChanged(int arg1);
     void update_shiftedit_combobox10_1();
     void on_shiftedit_comboBox10_1_currentIndexChanged(const QString &arg1);
     void update_shiftedit_combobox10_2();
     void on_shiftedit_spinbox10_1_valueChanged(int arg1);
     void on_shiftedit_spinbox10_2_valueChanged(int arg1);

     void on_shiftedit_checkBox11_stateChanged(int arg1);
     void update_shiftedit_combobox11_1();
     void on_shiftedit_comboBox11_1_currentIndexChanged(const QString &arg1);
     void update_shiftedit_combobox11_2();
     void on_shiftedit_spinbox11_1_valueChanged(int arg1);
     void on_shiftedit_spinbox11_2_valueChanged(int arg1);

     void on_shiftedit_checkBox12_stateChanged(int arg1);
     void update_shiftedit_combobox12_1();
     void on_shiftedit_comboBox12_1_currentIndexChanged(const QString &arg1);
     void update_shiftedit_combobox12_2();
     void on_shiftedit_spinbox12_1_valueChanged(int arg1);
     void on_shiftedit_spinbox12_2_valueChanged(int arg1);

     void on_shiftedit_spinbox_lunch_valueChanged(int arg1);




    //Clockout
    void clockout_initialize();
    QDateTime format_datetimes(QDateTime x);
    void on_clockout_finished_clicked();
    void on_clockout_cancel_clicked();
    void shift_length();
    void remaining_length();

    //New Clockout
    void on_clockout_checkBox1_stateChanged(int arg1);
    void update_clockout_comboBox1_1();
    void on_clockout_comboBox1_1_currentIndexChanged(const QString &arg1);
    void update_clockout_comboBox1_2();
    void on_clockout_spinbox1_1_valueChanged(int arg1);
    void on_clockout_spinbox1_2_valueChanged(int arg1);

    void on_clockout_checkBox2_stateChanged(int arg1);
    void update_clockout_comboBox2_1();
    void on_clockout_comboBox2_1_currentIndexChanged(const QString &arg1);
    void update_clockout_comboBox2_2();
    void on_clockout_spinbox2_1_valueChanged(int arg1);
    void on_clockout_spinbox2_2_valueChanged(int arg1);


    void on_clockout_checkBox3_stateChanged(int arg1);
    void update_clockout_comboBox3_1();
    void on_clockout_comboBox3_1_currentIndexChanged(const QString &arg1);
    void update_clockout_comboBox3_2();
    void on_clockout_spinbox3_1_valueChanged(int arg1);
    void on_clockout_spinbox3_2_valueChanged(int arg1);


    void on_clockout_checkBox4_stateChanged(int arg1);
    void update_clockout_comboBox4_1();
    void on_clockout_comboBox4_1_currentIndexChanged(const QString &arg1);
    void update_clockout_comboBox4_2();
    void on_clockout_spinbox4_1_valueChanged(int arg1);
    void on_clockout_spinbox4_2_valueChanged(int arg1);


    void on_clockout_checkBox5_stateChanged(int arg1);
    void update_clockout_comboBox5_1();
    void on_clockout_comboBox5_1_currentIndexChanged(const QString &arg1);
    void update_clockout_comboBox5_2();
    void on_clockout_spinbox5_1_valueChanged(int arg1);
    void on_clockout_spinbox5_2_valueChanged(int arg1);

    void on_clockout_checkBox6_stateChanged(int arg1);
    void update_clockout_comboBox6_1();
    void on_clockout_comboBox6_1_currentIndexChanged(const QString &arg1);
    void update_clockout_comboBox6_2();
    void on_clockout_spinbox6_1_valueChanged(int arg1);
    void on_clockout_spinbox6_2_valueChanged(int arg1);

    void on_clockout_checkBox7_stateChanged(int arg1);
    void update_clockout_comboBox7_1();
    void on_clockout_comboBox7_1_currentIndexChanged(const QString &arg1);
    void update_clockout_comboBox7_2();
    void on_clockout_spinbox7_1_valueChanged(int arg1);
    void on_clockout_spinbox7_2_valueChanged(int arg1);

    void on_clockout_checkBox8_stateChanged(int arg1);
    void update_clockout_comboBox8_1();
    void on_clockout_comboBox8_1_currentIndexChanged(const QString &arg1);
    void update_clockout_comboBox8_2();
    void on_clockout_spinbox8_1_valueChanged(int arg1);
    void on_clockout_spinbox8_2_valueChanged(int arg1);

    void on_clockout_checkBox9_stateChanged(int arg1);
    void update_clockout_comboBox9_1();
    void on_clockout_comboBox9_1_currentIndexChanged(const QString &arg1);
    void update_clockout_comboBox9_2();
    void on_clockout_spinbox9_1_valueChanged(int arg1);
    void on_clockout_spinbox9_2_valueChanged(int arg1);

    void on_clockout_checkBox10_stateChanged(int arg1);
    void update_clockout_comboBox10_1();
    void on_clockout_comboBox10_1_currentIndexChanged(const QString &arg1);
    void update_clockout_comboBox10_2();
    void on_clockout_spinbox10_1_valueChanged(int arg1);
    void on_clockout_spinbox10_2_valueChanged(int arg1);

    void on_clockout_checkBox11_stateChanged(int arg1);
    void update_clockout_comboBox11_1();
    void on_clockout_comboBox11_1_currentIndexChanged(const QString &arg1);
    void update_clockout_comboBox11_2();
    void on_clockout_spinbox11_1_valueChanged(int arg1);
    void on_clockout_spinbox11_2_valueChanged(int arg1);

    void on_clockout_checkBox12_stateChanged(int arg1);
    void update_clockout_comboBox12_1();
    void on_clockout_comboBox12_1_currentIndexChanged(const QString &arg1);
    void update_clockout_comboBox12_2();
    void on_clockout_spinbox12_1_valueChanged(int arg1);
    void on_clockout_spinbox12_2_valueChanged(int arg1);

    void on_clockout_spinbox_lunch_valueChanged(int arg1);

    void on_pushButton_clicked();















private:
    //General Database Classes
    bool ConnectEmployees();

    void DisconnectEmployees();


    //General Classes
    QString DateSyntax(QString wanted,QDateTime x);

    //Admin Classes
    void admin_initialize();
    void admin_update_tables();

        //Calender
        void admin_update_calendar();
        //Employee List
        void admin_update_employee_list();
        //Employee
        void admin_update_employee();

        //Admin List
        void admin_update_job_list();
        //Admin
        void admin_update_job();
        void admin_update_project_combo();
        void admin_update_project_combo2();
        void admin_update_project_combo3();

    //Employee Classes
    void employee_initialize();
    void employee_update_tables();

        //Calendar
        void employee_update_calendar();

        //Employee
        void employee_update_employee();
    void creatingTable();






    Ui::MainWindow *ui;
    QSqlDatabase employeeDataBase;
    QSqlDatabase projectDataBase;
    QString pin;
    QString id;
    QString selected_id;
    QString selected_pl_id;
    QString selected_item;
    int selected_work;
    QString length_of_shift;
    QString analyze_project_id;
    QString analyze_item_id;
    QString selected_shiftnumber;


};

#endif // MAINWINDOW_H
