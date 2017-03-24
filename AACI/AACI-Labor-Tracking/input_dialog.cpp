#include "input_dialog.h"
#include "ui_input_dialog.h"


Input_Dialog::Input_Dialog(QWidget *parent) :
    QDialog(parent,Qt::WindowStaysOnTopHint),
    ui(new Ui::Input_Dialog)
{

    setMouseTracking(true);
    ui->setupUi(this);
    ui->Employee_Finished->setEnabled(false);
    ui->Project_Finished->setEnabled(false);
    ui->Item_Finish->setEnabled(false);

    filter = new MyEventFilter;
    this->installEventFilter(filter);
    QObject::connect(filter,SIGNAL(active()),this,SLOT(when_active()));

    idle_timer = new QTimer();
    idle_timer->setInterval(60000);
    QObject::connect(idle_timer,SIGNAL(timeout()),this,SLOT(idle_user()));

    count_down = new QTimer();
    count_down->setInterval(11000);
    QObject::connect(count_down,SIGNAL(timeout()),this,SLOT(on_Timeout_inactive()));


    decrement = new QTimer();
    decrement->setInterval(1000);
    QObject::connect(decrement,SIGNAL(timeout()),this,SLOT(adjust_timer()));
}
Input_Dialog::~Input_Dialog()
{
    delete ui;
}

//This created this event to signal the parent when input_dialog->hide was called
void Input_Dialog::hideEvent(QHideEvent *ev)
{
    QDialog::hideEvent(ev);

    emit hidden();
}



void Input_Dialog::setPage(int x)
{


    ConnectEmployees();
    if(x==2)
    {
        ui->stackedWidget->setCurrentIndex(x);
        Item_update_combo_0();
        Item_update_combo_1();
        idle_timer->start();
    }
    else if(x==3)
    {
        ui->stackedWidget->setCurrentIndex(x);
        timeLeft=10;
        ui->Timeout_label_time->setText("Time Remaining:"+QString::number(timeLeft));
        count_down->start();
        decrement->start();

    }
    else if(x==4)
    {
        prev = ui->stackedWidget->currentIndex();
        ui->stackedWidget->setCurrentIndex(x);
        timeLeft=10;
        ui->Timeout2_label_time->setText("Time Remaining:"+QString::number(timeLeft));
        count_down->start();
        decrement->start();
    }
    else
    {
        ui->stackedWidget->setCurrentIndex(x);
        idle_timer->start();
    }


}

void Input_Dialog::ConnectEmployees()
{
    projectDataBase = QSqlDatabase::database("projectDataBase");
    employeeDataBase = QSqlDatabase::database("employeeDataBase");
    //projectDataBase = QSqlDatabase::addDatabase("QSQLITE","projectDataBase");
    //employeeDataBase = QSqlDatabase::addDatabase("QSQLITE","employeeDataBase");

    //QString employeepath="/SQLite/AACILaborTracking.db";
    //QString projectpath="/SQLite/AACIProjectList.db";

    //QString path = QDir::currentPath();
    //QString shortpath = path.split("/")[0]+"/"+path.split("/")[1]+"/"+path.split("/")[2]+"/"+path.split("/")[3]+"/"+path.split("/")[4];

    //employeeDataBase.setDatabaseName(shortpath+employeepath);
    //projectDataBase.setDatabaseName(shortpath+projectpath);

    //Work
    //employeeDataBase.setDatabaseName("C:/Users/joshu/Dropbox/Work/SQLite/AACILaborTracking.db");
    //projectDataBase.setDatabaseName("C:/Users/joshu/Dropbox/Work/SQLite/AACIProjectList.db");

    //ui->label->setPixmap(QPixmap("C:/Users/joshu/Dropbox/Work/AACI/AACI-Labor-Tracking/logos/logo1"));

    //Desktop
    //employeeDataBase.setDatabaseName("C:/Users/jose5/Dropbox/Work/SQLite/AACILaborTracking.db");
    //projectDataBase.setDatabaseName("C:/Users/jose5/Dropbox/Work/SQLite/AACIProjectList.db");
    //ui->label->setPixmap(QPixmap("C:/Users/jose5/Dropbox/Work/AACI/AACI-Labor-Tracking/logos/logo1"));

    //Laptop
    //employeeDataBase.setDatabaseName("C:/Users/Joshua Wootonn/Dropbox/Work/SQLite/AACILaborTracking.db");
    //projectDataBase.setDatabaseName("C:/Users/Joshua Wootonn/Dropbox/Work/SQLite/AACIProjectList.db");

    //BroadCast(status);
    //ui->login_label_status->setText(status);

}
void Input_Dialog::DisconnectEmployees()
{

    /*employeeDataBase.close();
    employeeDataBase.removeDatabase("employeeDataBase");
    projectDataBase.close();
    projectDataBase.removeDatabase("projectDataBase");*/
}

/* Section: Employee
 * Purpose: Adding an employee to employeelist in the employeeDataBase
 */
void Input_Dialog::on_Employee_Name_edit_textChanged()
{
    if(ui->Employee_Name_edit->text()!=""&&ui->Employee_Wage_spinBox->value()>10&&ui->Employee_Pin_Edit->text()!="")
        ui->Employee_Finished->setEnabled(true);
    else
        ui->Employee_Finished->setEnabled(false);
}
void Input_Dialog::on_Employee_Pin_Edit_textChanged()
{
    if(ui->Employee_Name_edit->text()!=""&&ui->Employee_Wage_spinBox->value()>10&&ui->Employee_Pin_Edit->text()!="")
        ui->Employee_Finished->setEnabled(true);
    else
        ui->Employee_Finished->setEnabled(false);
}
void Input_Dialog::on_Employee_Wage_spinBox_valueChanged(int arg1)
{
    if(ui->Employee_Name_edit->text()!=""&&ui->Employee_Wage_spinBox->value()>10&&ui->Employee_Pin_Edit->text()!="")
        ui->Employee_Finished->setEnabled(true);
    else
        ui->Employee_Finished->setEnabled(false);

    arg1++;
}
void Input_Dialog::on_Employee_Admin_CheckBox_stateChanged()
{
    if(ui->Employee_Name_edit->text()!=""&&ui->Employee_Wage_spinBox->value()>10&&ui->Employee_Pin_Edit->text()!="")
        ui->Employee_Finished->setEnabled(true);
    else
        ui->Employee_Finished->setEnabled(false);
}
void Input_Dialog::on_Employee_Finished_clicked()
{
    QSqlQuery qry(employeeDataBase);
    QString x;
    int y;
    int error = 0;
    qry.prepare("SELECT id FROM employeelist ORDER BY id DESC LIMIT 1");
    if (qry.exec())
    {
        while(qry.next())
        {
            x=qry.value(0).toString();
            y=x.toInt();
            y++;
            x=QString::number(y);
        }
    }
    else
    {
        error++;
    }
    QString name,ID,adminstatus,wage;

    name = ui->Employee_Name_edit->text();
    ID = ui->Employee_Pin_Edit->text();
    if(ui->Employee_Admin_CheckBox->isChecked())
        adminstatus="1";
    else
        adminstatus="0";
    wage = QString::number(ui->Employee_Wage_spinBox->value());
    qry.clear();
    qry.prepare("insert into employeelist(name,pin,adminstatus,wage,shiftcount,active,id)  values('"+name+"','"+ID+"','"+adminstatus+"','"+wage+"',0,0,'"+x+"')");
    if (qry.exec())
    {

    }
    else
    {
        error++;
    }


    //This statement creates a table named after the employee's id which holds their clockin and clockout times.
    qry.clear();
    qry.exec("CREATE TABLE '"+x+"'"
               "( shiftnumber integer, clockin DATETIME, clockout DATETIME,lunch VARCHAR,one VARCHAR ,two VARCHAR ,three VARCHAR ,four VARCHAR ,five VARCHAR ,six VARCHAR ,seven VARCHAR ,eight VARCHAR ,nine VARCHAR ,ten VARCHAR ,eleven VARCHAR ,twelve VARCHAR)");




    ui->Employee_Name_edit->setText("");
    ui->Employee_Pin_Edit->setText("");
    ui->Employee_Admin_CheckBox->setChecked(false);
    ui->Employee_Wage_spinBox->setValue(10);
    this->hide();
}
void Input_Dialog::on_Employee_Cancel_clicked()
{
    ui->Employee_Name_edit->setText("");
    ui->Employee_Pin_Edit->setText("");
    ui->Employee_Admin_CheckBox->setChecked(false);
    ui->Employee_Wage_spinBox->setValue(10);
    this->hide();
}

/* Section: Project
 * Purpose: Adding an project to projectlist in the projectDataBase
 */
void Input_Dialog::on_Project_Project_Edit_textChanged()
{

    if(ui->Project_Project_Edit->text()=="")
        ui->Project_Finished->setEnabled(false);
    else
        ui->Project_Finished->setEnabled(true);
}
void Input_Dialog::on_Project_Finished_clicked()
{
    QSqlQuery qry(projectDataBase), qry1(projectDataBase);
    QString x;
    int y;
    int error = 0;

    qry1.prepare("SELECT id FROM projectlist ORDER BY id DESC LIMIT 1");
    if (qry1.exec())
    {
        while(qry1.next())
        {
            x=qry1.value(0).toString();

            y=x.toInt();
            y++;
            x=QString::number(y);
        }
    }
    else
    {
        error++;
    }


    QString name = ui->Project_Project_Edit->text();
    qry.prepare("insert into projectlist(name,active,id)  values('"+name+"',1,'"+x+"')");
    if (qry.exec())
    {

    }
    else
    {
        error++;
    }

    QSqlQuery qry2(projectDataBase);

    qry2.exec("CREATE TABLE '"+x+"'"
               "(name VARCHAR, length VARCHAR, cost VARCHAR, id VARCHAR)");


    ui->Project_Project_Edit->setText("");
    this->hide();

}
void Input_Dialog::on_Project_Cancel_clicked()
{
    ui->Project_Project_Edit->setText("");
    this->hide();
}

/* Section: Item
 * Purpose: Adding an item to itemlist in the projectDataBase
 */
void Input_Dialog::Item_update_combo_0()
{
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from projectlist");
    qry->exec();
    modal->setQuery(*qry);
    ui->Item_Combo_0->setModel(modal);

}
void Input_Dialog::Item_update_combo_1()
{
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select DISTINCT cate from itemlist");
    qry->exec();
    modal->setQuery(*qry);
    ui->Item_Combo_1->setModel(modal);

}
void Input_Dialog::Item_update_combo_2()
{
    QString x = ui->Item_Combo_1->currentText();
    QSqlQueryModel * modal2=new QSqlQueryModel();
    QSqlQuery* qry2=new QSqlQuery(projectDataBase);
    qry2->prepare("select DISTINCT sub from itemlist where cate='"+x+"'");
    qry2->exec();
    modal2->setQuery(*qry2);
    ui->Item_Combo_2->setModel(modal2);

}
void Input_Dialog::Item_update_combo_3()
{
    QString x = ui->Item_Combo_2->currentText();
    QSqlQueryModel * modal3=new QSqlQueryModel();
    QSqlQuery* qry2=new QSqlQuery(projectDataBase);
    qry2->prepare("select dim from itemlist where sub='"+x+"'");
    qry2->exec();
    modal3->setQuery(*qry2);
    ui->Item_Combo_3->setModel(modal3);

}
void Input_Dialog::on_Item_Combo_1_currentIndexChanged(const QString &arg1)
{
    Item_update_combo_2();
    QString x = arg1;
}
void Input_Dialog::on_Item_Combo_2_currentIndexChanged(const QString &arg1)
{
    Item_update_combo_3();
    QString x = arg1;
}
void Input_Dialog::on_Item_Finish_clicked()
{
    QString projectName = ui->Item_Combo_0->currentText();
    QString cate = ui->Item_Combo_1->currentText();
    QString sub = ui->Item_Combo_2->currentText();
    QString dim = ui->Item_Combo_3->currentText();
    QSqlQuery qry(projectDataBase), qry1(projectDataBase);
    QString item_id,project_id;
    QString x = QString::number(ui->Item_Time_Spin->value())+":00";
    QString y = QString::number(ui->Item_Cost_Spin->value())+".0";
    QString composite;
    int error=0;
    if(sub=="Na"&&dim=="Na")
    {
        composite = cate;
    }
    else if(sub=="Na"&&dim!="Na")
    {
        composite = cate+" "+dim;
    }
    else if (dim=="Na")
    {
        composite = cate+" "+sub;
    }
    else
    {
        composite = cate+" "+sub+" "+dim;
    }
    qry1.prepare("Select id from projectlist where name='"+projectName+"'");
    if(qry1.exec())
    {
        while(qry1.next())
        {
            project_id = qry1.value(0).toString();
        }
    }
    else
        error++;
    qry1.clear();


    qry1.prepare("Select id from itemlist where cate='"+cate+"' and sub='"+sub+"' and dim='"+dim+"'");
    if(qry1.exec())
    {
        while(qry1.next())
        {
            item_id = qry1.value(0).toString();
        }
    }
    else
        error++;
    qry1.clear();
    QString checker;

    qry1.prepare("Select name from '"+project_id+"' where id='"+item_id+"'");
    if(qry1.exec())
    {
        while(qry1.next())
        {
            checker= qry1.value(0).toString();
        }
    }
    else
        error++;



    if(checker=="")
    {
        qry.prepare("insert into '"+project_id+"'(name,length,cost,id) values('"+composite+"','"+x+"','"+y+"','"+item_id+"')");
        qry.exec();

    }
    else
    {
        error++;
    }
/*
    if(error==0)
        BroadCast("Add Success!");
    else
        BroadCast("Error with the add function!");
*/
    Item_update_combo_0();
    Item_update_combo_1();
    Item_update_combo_2();
    Item_update_combo_3();
    ui->Item_Cost_Spin->setValue(0);
    ui->Item_Time_Spin->setValue(0);
    this->hide();
}
void Input_Dialog::on_Item_Cancel_clicked()
{
    Item_update_combo_0();
    Item_update_combo_1();
    Item_update_combo_2();
    Item_update_combo_3();
    ui->Item_Cost_Spin->setValue(0);
    ui->Item_Time_Spin->setValue(0);
    this->hide();
}
void Input_Dialog::on_Item_Time_Spin_valueChanged(const QString &arg1)
{
    QString x = arg1;
    if(ui->Item_Time_Spin->value()!=0&&ui->Item_Cost_Spin->value()!=0)
        ui->Item_Finish->setEnabled(true);
    else
        ui->Item_Finish->setEnabled(false);
}
void Input_Dialog::on_Item_Cost_Spin_valueChanged(const QString &arg1)
{
    QString x = arg1;
    if(ui->Item_Time_Spin->value()!=0&&ui->Item_Cost_Spin->value()!=0)
        ui->Item_Finish->setEnabled(true);
    else
        ui->Item_Finish->setEnabled(false);
}




/* Section: Timeout
 * Purpose: Handle inavtivity from the user
 */

void Input_Dialog::on_Timeout_button_yes_clicked()
{
    count_down->stop();
    decrement->stop();
    this->hide();
}
void Input_Dialog::on_Timeout2_button_yes_clicked()
{
    count_down->stop();
    decrement->stop();
    setPage(prev);


}
void Input_Dialog::when_active(){

    if(ui->stackedWidget->currentIndex()!=3&&ui->stackedWidget->currentIndex()!=4){
        idle_timer->start();
        qDebug()<<"wow active in the sub class";
    }


}

void Input_Dialog::on_Timeout_inactive(){
    ui->Employee_Name_edit->setText("");
    ui->Employee_Pin_Edit->setText("");
    ui->Employee_Admin_CheckBox->setChecked(false);
    ui->Employee_Wage_spinBox->setValue(10);

    ui->Project_Project_Edit->setText("");

    Item_update_combo_0();
    Item_update_combo_1();
    Item_update_combo_2();
    Item_update_combo_3();
    ui->Item_Cost_Spin->setValue(0);
    ui->Item_Time_Spin->setValue(0);

    this->hide();
    count_down->stop();
    decrement->stop();
    emit inactive();
}
void Input_Dialog::idle_user(){
    idle_timer->stop();
    setPage(4);
}
void Input_Dialog::adjust_timer(){
   timeLeft--;
   ui->Timeout_label_time->setText("Time Remaining:"+QString::number(timeLeft));
   ui->Timeout2_label_time->setText("Time Remaining:"+QString::number(timeLeft));
   decrement->start();
}

