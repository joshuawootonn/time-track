#include "mainform.h"
#include "ui_mainform.h"

MainForm::MainForm(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::MainForm)
{
    Connect();
    ui->setupUi(this);
    hidetheThings();
    loginForm = new LoginForm(this);
    clockoutForm = new ClockoutForm(this);
    clockoutForm->hide();
    ui->mainStack->setCurrentIndex(0);
    loginInitialize();


    establishConnections();
}

MainForm::~MainForm()
{
    delete ui;
}
void MainForm::Connect()
{

    projectDataBase = QSqlDatabase::addDatabase("QSQLITE","projectDataBase");
    employeeDataBase = QSqlDatabase::addDatabase("QSQLITE","employeeDataBase");
    data = employeeDataBase = QSqlDatabase::addDatabase("QSQLITE","data");
//    QString u = "C:/Users/jose5/Dropbox/Work/SQLite/AACILaborTracking.db";
//    QString i = "C:/Users/jose5/Dropbox/Work/SQLite/AACIProjectList.db";
//    employeeDataBase.setDatabaseName(u);
//    projectDataBase.setDatabaseName(i);
//    employeeDataBase.open();
//    projectDataBase.open();

    QString x = "//SERVER-JOSH/AACI Labor Tracking/Data/AACILaborTracking.db";
    QString y = "//SERVER-JOSH/AACI Labor Tracking/Data/AACIProjectList.db";

    QString employeepath="/SQLite/AACILaborTracking.db";
    QString projectpath="/SQLite/AACIProjectList.db";
    QString datapath = "/SQLite/AACIData.sqlite";
    QString path = QDir::currentPath();
    QString a = path+"/AACILaborTracking.db";
    QString b = path+"/AACIProjectList.db";
    QString serverpath = path.split("/")[0]+"/"+path.split("/")[1]+"/"+path.split("/")[2]+"/"+path.split("/")[3]+"/"+path.split("/")[4];

    if(fileExists(serverpath+employeepath)){
        employeeDataBase.setDatabaseName(serverpath+employeepath);
        projectDataBase.setDatabaseName(serverpath+projectpath);
        data.setDatabaseName(serverpath+datapath);
        //qDebug()<<serverpath+projectpath;
        qDebug()<<"2";
    }
    else if(fileExists(x)&&fileExists(y))
    {
        employeeDataBase.setDatabaseName(x);
        projectDataBase.setDatabaseName(y);
        qDebug()<<"0";
    }
    else if(fileExists(a)&&fileExists(b))
    {
        employeeDataBase.setDatabaseName(a);
        projectDataBase.setDatabaseName(b);
        qDebug()<<"1";
    }

    employeeDataBase.open();
    projectDataBase.open();
    data.open();

}
void MainForm::Disconnect(){
    employeeDataBase.close();
    employeeDataBase.removeDatabase("employeeDataBase");
    projectDataBase.close();
    projectDataBase.removeDatabase("projectDataBase");
}
void MainForm::establishConnections(){
    QObject::connect(loginForm,SIGNAL(logged()),this,SLOT(enter()));
    QObject::connect(clockoutForm,SIGNAL(finished()),this,SLOT(reenter()));

}
bool MainForm::fileExists(QString path) {
    QFileInfo check_file(path);

    return check_file.exists() && check_file.isFile();
}
void MainForm::enter(){
    showtheThings();
    mainInitialize();
}
void MainForm::reenter(){
    showtheThings();
    basicInitialize();
}
void MainForm::hidetheThings(){
    ui->basicPageAdvanced->hide();
    ui->basicPageClockIn->hide();
    ui->basicPageClockOut->hide();

}
void MainForm::showtheThings(){
    ui->basicPageAdvanced->show();
    ui->basicPageClockIn->show();
    ui->basicPageClockOut->show();

}

void MainForm::loginInitialize(){
    basicInitialize();
    hidetheThings();
    loginForm->setWindowFlags(Qt::CustomizeWindowHint);

    loginForm->LoginInitialize();

}
void MainForm::mainInitialize(){
    id=loginForm->id;
    admin=loginForm->admin;

    basicInitialize();
}
void MainForm::basicInitialize()
{
    ui->mainStack->setCurrentIndex(0);
    if(admin==true)
        ui->basicPageAdvanced->show();
    else
        ui->basicPageAdvanced->hide();

    QSqlQuery qry(data);
    QString active;

    qry.prepare("SELECT active FROM employeelist WHERE id = '"+id+"'");
    if(qry.exec())
    {
        while(qry.next())
        {
            active = qry.value(0).toString();
        }
    }
    if(active == "1")
    {
       ui->basicPageClockIn->hide();
       ui->basicPageClockOut->show();
    }
    else if(active== "0")
    {
        ui->basicPageClockIn->show();
        ui->basicPageClockOut->hide();
    }
}
void MainForm::advInitialize(){
    ui->mainStack->setCurrentIndex(1);

}
QDateTime MainForm::format_datetimes(QDateTime z)
{
    int minTime = z.time().minute();
    int hourTime =z.time().hour();
    int dayOfMonth = z.date().daysInMonth();
    int dayOfYear = z.date().dayOfYear();
    if(minTime<7&&minTime>=0)
    {
        QTime x(z.time().hour(),0,0);
        QDateTime n(z.date(),x);
        z=n;
    }
    else if(minTime>=7&&minTime<23)
    {
        QTime x(z.time().hour(),15,0);
        QDate y(z.date());
        QDateTime n(y,x);
        z=n;
    }
    else if(minTime>=23&&minTime<37)
    {
        QTime x(z.time().hour(),30,0);
        QDateTime n(z.date(),x);
        z=n;
    }
    else if(minTime>=37&&minTime<53)
    {
        QTime x(z.time().hour(),45,0);
        QDateTime n(z.date(),x);
        z=n;
    }
    else if(minTime>=53 && hourTime==23 && z.date().day()==dayOfMonth&& z.date().daysInYear()==dayOfYear)
    {
        z.date().addYears(1);
        z.date().addDays(1);
        z.date().addMonths(1);
        QTime x(z.time().hour()+1,0,0);
        QDateTime n(z.date(),x);
        z=n;
    }
    else if(minTime>=53 && hourTime==23 && z.date().day()==dayOfMonth)
    {
        z.date().addDays(1);
        z.date().addMonths(1);
        QTime x(z.time().hour()+1,0,0);
        QDateTime n(z.date(),x);
        z=n;
    }
    else if(minTime>=53 && hourTime==23)
    {
        z.date().addDays(1);
        QTime x(z.time().hour()+1,0,0);
        QDateTime n(z.date(),x);
        z=n;
    }
    else if(minTime>=53)
    {
        QTime x(z.time().hour()+1,0,0);
        QDateTime n(z.date(),x);
        z=n;
    }
    return z;

}
void MainForm::on_basicPageClockIn_clicked()
{
    QSqlQuery qry1(data),qry2(data),qry3(data),qry4(data);
    QString employeename, employeeid, timein,datein;
    QDateTime x = QDateTime::currentDateTime();
    QDateTime z = format_datetimes(x);

    employeeid = id;
    timein = z.toString("HH:mm:ss");
    datein = z.toString("yyyy-MM-dd");
    qry1.prepare("SELECT shiftcount,name FROM employeelist WHERE id = '"+id+"'");


    if(qry1.exec())
    {

        while(qry1.next())
        {

            employeename = qry1.value(1).toString();
        }
    }




    // Inserting clockin time and shiftnumber into pin.
    qry4.prepare("insert into shiftlist (employeeid,employeename,timein,datein) values('"+employeeid+"','"+employeename+"','"+timein+"','"+datein+"')");
    if (qry4.exec())
    {
        // Setting active.
        qry2.prepare("update employeelist set active=1 where id = '"+id+"'");
        qry2.exec();
        // Setting employeelist shiftcount.
        QString shiftcount;
        qry1.clear();
        qry1.prepare("select id from shiftlist where employeename ='"+employeename+"' and timein='"+timein+"'");
        if(qry1.exec())
        {
            while(qry1.next())
            {
                shiftcount = qry1.value(0).toString();
            }
        }

        qry3.prepare("update employeelist set shiftcount = '"+shiftcount+"' where id = '"+id+"'");
        qry3.exec();
    }

    ui->basicPageClockIn->hide();
    ui->basicPageClockOut->show();


}
void MainForm::on_basicPageClockOut_clicked()
{
    clockoutForm->ClockoutInitialize(id);
}
void MainForm::on_basicPageAdvanced_clicked()
{
    advInitialize();
    EmployeeTab();
    ShiftTab();
    ProjectTab();
    ItemTab();
    ui->MainTabs->setCurrentIndex(0);
    ui->HeaderTabs->setCurrentIndex(0);
}
void MainForm::on_mainFinish_clicked()
{

    loginInitialize();
}


//Employee Stuff
void MainForm::EmployeeTab()
{
    ui->MainTabs->setCurrentIndex(0);

    QSqlQueryModel * x=EmployeeModel();
    ui->EmployeeView->setModel(x);
    ui->EmployeeView->resizeColumnsToContents();

    ui->EmployeeName->setChecked(true);
    ui->EmployeeView->showColumn(0);
    ui->EmployeeId->setChecked(false);
    ui->EmployeeView->hideColumn(1);
    ui->EmployeePin->setChecked(true);
    ui->EmployeeView->showColumn(2);
    ui->EmployeeAdminStatus->setChecked(true);
    ui->EmployeeView->showColumn(3);
    ui->EmployeeShiftCount->setChecked(false);
    ui->EmployeeView->hideColumn(4);
    ui->EmployeeActive->setChecked(false);
    ui->EmployeeView->hideColumn(5);
    ui->EmployeeCurrent->setChecked(false);
    ui->EmployeeView->hideColumn(6);


    ui->AllRadio->setChecked(true);


}
void MainForm::refreshEmployeeTab(){
    ui->MainTabs->setCurrentIndex(0);

    QSqlQueryModel * x=EmployeeModel();
    ui->EmployeeView->setModel(x);
    

    ui->EmployeeView->resizeColumnsToContents();

    if(ui->EmployeeName->isChecked())
        ui->EmployeeView->showColumn(0);
    else
        ui->EmployeeView->hideColumn(0);

    if(ui->EmployeeId->isChecked())
        ui->EmployeeView->showColumn(1);
    else
        ui->EmployeeView->hideColumn(1);

    if(ui->EmployeePin->isChecked())
        ui->EmployeeView->showColumn(2);
    else
        ui->EmployeeView->hideColumn(2);

    if(ui->EmployeeAdminStatus->isChecked())
        ui->EmployeeView->showColumn(3);
    else
        ui->EmployeeView->hideColumn(3);

    if(ui->EmployeeShiftCount->isChecked())
        ui->EmployeeView->showColumn(4);
    else
        ui->EmployeeView->hideColumn(4);

    if(ui->EmployeeActive->isChecked())
        ui->EmployeeView->showColumn(5);
    else
        ui->EmployeeView->hideColumn(5);

    if(ui->EmployeeCurrent->isChecked())
        ui->EmployeeView->showColumn(6);
    else
        ui->EmployeeView->hideColumn(6);

    
}
QSqlQueryModel * MainForm::EmployeeModel(){
    QSqlTableModel * model = new QSqlTableModel(0,data);
    model->setTable("employeelist");
    model->setEditStrategy(QSqlTableModel::OnFieldChange);
    model->select();
    model->setHeaderData(0,Qt::Horizontal,tr("Name"));
    model->setHeaderData(1,Qt::Horizontal,tr("Id"));
    model->setHeaderData(2,Qt::Horizontal,tr("Pin"));
    model->setHeaderData(3,Qt::Horizontal,tr("Adminstatus"));
    model->setHeaderData(4,Qt::Horizontal,tr("Shiftcount"));
    model->setHeaderData(5,Qt::Horizontal,tr("Active"));
    model->setHeaderData(6,Qt::Horizontal,tr("Current"));
    return model;

}
//Employee Menu 1
void MainForm::on_EmployeeAdd_clicked()
{
    QSqlQuery * qry = new QSqlQuery(data);
    QSqlQueryModel * x = EmployeeModel();
    qry->prepare("insert into employeelist(name,pin,adminstatus,shiftcount,active,current)  values('~','~','~','1','0','1')");
    qry->exec();
    refreshEmployeeTab();
}
void MainForm::on_EmployeeArchive_clicked()
{

    QSqlQuery * qry = new QSqlQuery(data);
    QModelIndexList list = ui->EmployeeView->selectionModel()->selection().indexes();
    QSqlQueryModel * x = EmployeeModel();

    for(int i=0; i< list.count(); i++)
    {
        QModelIndex index =list.at(i);
        int idInt = x->record(index.row()).value(1).toInt();
        QString id = QString::number(idInt);

        qry->clear();
        if(x->record(index.row()).value(6).toInt()==1)
        {
            qry->prepare("update employeelist set current=0 where id = '"+id+"'");
        }
        else if (x->record(index.row()).value(6).toInt()==0)
        {
            qry->prepare("update employeelist set current=1 where id = '"+id+"'");
        }
        qry->exec();
    }
    refreshEmployeeTab();
}
void MainForm::on_EmployeeDelete_clicked()
{
    QSqlQuery * qry = new QSqlQuery(data);
    QModelIndexList list = ui->EmployeeView->selectionModel()->selection().indexes();
    QSqlQueryModel * x = EmployeeModel();

    for(int i=0; i< list.count(); i++)
    {
        QModelIndex index =list.at(i);
        int idInt = x->record(index.row()).value(1).toInt();
        QString id = QString::number(idInt);

        qry->clear();
        qry->prepare("DELETE from employeelist where id='"+id+"'");
        qry->exec();
    }
    refreshEmployeeTab();

}
//Employee Menu 2
void MainForm::on_EmployeeName_clicked()
{
    refreshEmployeeTab();
}
void MainForm::on_EmployeePin_clicked()
{
    refreshEmployeeTab();
}
void MainForm::on_EmployeeAdminStatus_clicked()
{
    refreshEmployeeTab();
}
void MainForm::on_EmployeeShiftCount_clicked()
{
    refreshEmployeeTab();
}
void MainForm::on_EmployeeActive_clicked()
{
    refreshEmployeeTab();
}
void MainForm::on_EmployeeId_clicked()
{
    refreshEmployeeTab();
}
void MainForm::on_EmployeeCurrent_clicked()
{
    refreshEmployeeTab();
}
//Employee Menu 3
void MainForm::on_AllRadio_toggled(bool checked)
{
    if(checked)
    {
        QSqlQueryModel * x = EmployeeModel();
        for(int i=0; i< x->rowCount(); i++)
        {
            ui->EmployeeView->showRow(i);
        }
    }

}
void MainForm::on_CurrentRadio_toggled(bool checked)
{
    if(checked)
    {
        QSqlQueryModel * x = EmployeeModel();
        for(int i=0; i< x->rowCount(); i++)
        {
            int current = x->record(i).value(6).toInt();
            if(current == 1)
               ui->EmployeeView->showRow(i);
            else
                ui->EmployeeView->hideRow(i);
        }
    }
}
void MainForm::on_PastRadio_toggled(bool checked)
{
    if(checked)
    {
        QSqlQueryModel * x = EmployeeModel();
        for(int i=0; i< x->rowCount(); i++)
        {
            int current = x->record(i).value(6).toInt();
            if(current == 1)
               ui->EmployeeView->hideRow(i);
            else
                ui->EmployeeView->showRow(i);
        }
    }
}


void MainForm::ProjectTab(){
    QSqlQueryModel * x=ProjectModel();
    ui->ProjectView->setModel(x);
    ui->ProjectView->resizeColumnsToContents();
    ui->ProjectView->hideColumn(1);
    ui->ProjectView->hideColumn(2);
    ui->ProjectName->setChecked(true);
    ui->ProjectAllRadio->setChecked(true);
}
QSqlQueryModel * MainForm::ProjectModel(){
    QSqlTableModel * model = new QSqlTableModel(0,data);
    model->setTable("projectlist");
    model->setEditStrategy(QSqlTableModel::OnFieldChange);
    model->select();

    model->setHeaderData(0,Qt::Horizontal,tr("Name"));
    model->setHeaderData(1,Qt::Horizontal,tr("Id"));
    model->setHeaderData(2,Qt::Horizontal,tr("Current"));


    return model;

}
void MainForm::refreshProjectTab(){
    ui->MainTabs->setCurrentIndex(1);

    QSqlQueryModel * x=ProjectModel();
    ui->ProjectView->setModel(x);

    ui->ProjectView->resizeColumnsToContents();


    if(ui->ProjectName->isChecked())
        ui->ProjectView->showColumn(0);
    else
        ui->ProjectView->hideColumn(0);

    if(ui->ProjectId->isChecked())
        ui->ProjectView->showColumn(1);
    else
        ui->ProjectView->hideColumn(1);

    if(ui->ProjectCurrent->isChecked())
        ui->ProjectView->showColumn(2);
    else
        ui->ProjectView->hideColumn(2);



}

void MainForm::on_ProjectAdd_clicked()
{
    QSqlQuery * qry = new QSqlQuery(data);

    QSqlQueryModel * x = ProjectModel();


    qry->prepare("insert into projectlist(name,current)  values('~','1')");
    qry->exec();
    qry->clear();

    int idInt = x->record(x->rowCount()-1).value(1).toInt();
    idInt++;
    QString id = QString::number(idInt);
    qry->prepare("CREATE TABLE '"+id+"'"
               "(id integer, name VARCHAR)");
    qry->exec();
    refreshProjectTab();
}
void MainForm::on_ProjectDelete_clicked()
{
    QSqlQuery * qry = new QSqlQuery(data);
    QModelIndexList list = ui->ProjectView->selectionModel()->selection().indexes();
    QSqlQueryModel * x = ProjectModel();

    for(int i=0; i< list.count(); i++)
    {
        QModelIndex index =list.at(i);
        int idInt = x->record(index.row()).value(1).toInt();
        QString id = QString::number(idInt);

        qry->clear();
        qry->prepare("DROP TABLE '"+id+"'");
        qry->exec();
        qry->clear();
        qry->prepare("DELETE from projectlist where id='"+id+"'");
        qry->exec();
    }
    refreshProjectTab();
}
void MainForm::on_ProjectArchive_clicked()
{
    QSqlQuery * qry = new QSqlQuery(data);
    QModelIndexList list = ui->ProjectView->selectionModel()->selection().indexes();
    QSqlQueryModel * x = ProjectModel();

    for(int i=0; i< list.count(); i++)
    {
        QModelIndex index =list.at(i);
        int idInt = x->record(index.row()).value(1).toInt();
        QString id = QString::number(idInt);
        qDebug()<<id;
        qry->clear();
        if(x->record(index.row()).value(2).toInt()==1)
        {
            qry->prepare("update projectlist set current=0 where id = '"+id+"'");
        }
        else if (x->record(index.row()).value(2).toInt()==0)
        {
            qry->prepare("update projectlist set current=1 where id = '"+id+"'");
        }
        qry->exec();
    }
    refreshProjectTab();
}

void MainForm::on_ProjectName_clicked()
{
    refreshProjectTab();
}
void MainForm::on_ProjectId_clicked()
{
    refreshProjectTab();
}
void MainForm::on_ProjectCurrent_clicked()
{
    refreshProjectTab();
}

void MainForm::on_ProjectAllRadio_toggled(bool checked)
{
    if(checked){
        QSqlQueryModel * x = ProjectModel();
        for(int i=0; i< x->rowCount(); i++)
        {
            ui->ProjectView->showRow(i);
        }
    }
}
void MainForm::on_ProjectCurrentRadio_toggled(bool checked)
{
    if(checked){
        QSqlQueryModel * x = ProjectModel();
        for(int i=0; i< x->rowCount(); i++)
        {
            int current = x->record(i).value(2).toInt();
            if(current == 1)
               ui->ProjectView->showRow(i);
            else
                ui->ProjectView->hideRow(i);
        }
    }
}
void MainForm::on_ProjectPastRadio_toggled(bool checked)
{
    if(checked){
        QSqlQueryModel * x = ProjectModel();
        for(int i=0; i< x->rowCount(); i++)
        {
            int current = x->record(i).value(2).toInt();
            if(current == 1)
               ui->ProjectView->hideRow(i);
            else
                ui->ProjectView->showRow(i);
        }
    }
}




void MainForm::ItemTab(){
    QSqlQueryModel * x=ItemModel();
    ui->ItemView->setModel(x);
    ui->ItemView->resizeColumnsToContents();
    ui->ItemView->hideColumn(4);
    ui->ItemView->hideColumn(3);
    ui->ItemView->hideColumn(2);
    ui->ItemName->setChecked(true);
    ui->ItemId->setChecked(true);
}
QSqlQueryModel * MainForm::ItemModel(){
    QSqlTableModel * model = new QSqlTableModel(0,data);
    model->setTable("itemlist");
    model->setEditStrategy(QSqlTableModel::OnFieldChange);
    model->select();
    model->setHeaderData(0,Qt::Horizontal,tr("Name"));
    model->setHeaderData(1,Qt::Horizontal,tr("Id"));
    model->setHeaderData(2,Qt::Horizontal,tr("Category"));
    model->setHeaderData(4,Qt::Horizontal,tr("Sub-Catergory"));
    model->setHeaderData(3,Qt::Horizontal,tr("Dimension"));

    return model;

}
void MainForm::refreshItemTab(){
    ui->MainTabs->setCurrentIndex(2);

    QSqlQueryModel * x=ItemModel();
    ui->ItemView->setModel(x);

    ui->ItemView->resizeColumnsToContents();

    if(ui->ItemCategory->isChecked())
        ui->ItemView->showColumn(2);
    else
        ui->ItemView->hideColumn(2);

    if(ui->ItemSub->isChecked())
        ui->ItemView->showColumn(3);
    else
        ui->ItemView->hideColumn(3);

    if(ui->ItemDimension->isChecked())
        ui->ItemView->showColumn(4);
    else
        ui->ItemView->hideColumn(4);

    if(ui->ItemId->isChecked())
        ui->ItemView->showColumn(1);
    else
        ui->ItemView->hideColumn(1);

    if(ui->ItemName->isChecked())
        ui->ItemView->showColumn(0);
    else
        ui->ItemView->hideColumn(0);


}

void MainForm::on_ItemAdd_clicked()
{
    QSqlQuery * qry = new QSqlQuery(data);
    QSqlQueryModel * x = ItemModel();
    qry->prepare("insert into itemlist(name,category,subcategory,dimension)  values('~','~','~','~')");
    qry->exec();
    refreshItemTab();
}
void MainForm::on_ItemDelete_clicked()
{
    QSqlQuery * qry = new QSqlQuery(data);
    QModelIndexList list = ui->ItemView->selectionModel()->selection().indexes();
    QSqlQueryModel * x = ItemModel();

    for(int i=0; i< list.count(); i++)
    {
        QModelIndex index =list.at(i);
        int idInt = x->record(index.row()).value(1).toInt();
        QString id = QString::number(idInt);


        qry->clear();
        qry->prepare("DELETE from itemlist where id='"+id+"'");
        qry->exec();
    }
    refreshItemTab();
}

void MainForm::on_ItemName_clicked()
{
    refreshItemTab();
}
void MainForm::on_ItemId_clicked()
{
    refreshItemTab();
}
void MainForm::on_ItemCategory_clicked()
{
    refreshItemTab();
}
void MainForm::on_ItemSub_clicked()
{
    refreshItemTab();
}
void MainForm::on_ItemDimension_clicked()
{
    refreshItemTab();
}



void MainForm::ShiftTab(){

    ui->ShiftEmployeeRadio->setChecked(true);

    QSqlQueryModel * a = new QSqlQueryModel();
    QSqlQuery * A = new QSqlQuery(data);
    A->prepare("Select name from employeelist");
    A->exec();
    a->setQuery(*A);
    ui->ShiftEmployeeCombo->setModel(a);

    QSqlQueryModel * b = new QSqlQueryModel();
    QSqlQuery * B = new QSqlQuery(data);
    B->prepare("Select name from projectlist");
    B->exec();
    b->setQuery(*B);
    ui->ShiftProjectCombo->setModel(b);

    QSqlQueryModel * c = new QSqlQueryModel();
    QSqlQuery * C = new QSqlQuery(data);
    C->prepare("Select name from itemlist");
    C->exec();
    c->setQuery(*C);
    ui->ShiftItemCombo->setModel(c);


    QSqlQueryModel * x=ShiftModel();

    ui->ShiftView->setModel(x);

}
QSqlQueryModel * MainForm::ShiftModel(){

    QSqlTableModel * model = new QSqlTableModel(0,data);

    model->setTable("shiftlist");
    model->setEditStrategy(QSqlTableModel::OnFieldChange);
    model->select();
    model->setHeaderData(0,Qt::Horizontal,tr("Id"));
    model->setHeaderData(1,Qt::Horizontal,tr("Employee Id"));
    model->setHeaderData(2,Qt::Horizontal,tr("Project Id"));
    model->setHeaderData(3,Qt::Horizontal,tr("Item Dd"));
    model->setHeaderData(4,Qt::Horizontal,tr("Employee Name"));
    model->setHeaderData(5,Qt::Horizontal,tr("Project Name"));
    model->setHeaderData(6,Qt::Horizontal,tr("Item Name"));
    model->setHeaderData(7,Qt::Horizontal,tr("Time In"));
    model->setHeaderData(8,Qt::Horizontal,tr("Date In"));
    model->setHeaderData(9,Qt::Horizontal,tr("Time Out"));
    model->setHeaderData(10,Qt::Horizontal,tr("Date out"));
    model->setHeaderData(11,Qt::Horizontal,tr("Lunch Time"));
    model->setHeaderData(12,Qt::Horizontal,tr("Time"));


    return model;

}
void MainForm::refreshShiftTab(){
    ui->MainTabs->setCurrentIndex(3);

    QSqlQueryModel * x=ShiftModel();
    ui->ShiftView->setModel(x);



}

void MainForm::on_ShiftEmployeeRadio_toggled(bool checked)
{
    if(checked){
        QSqlQueryModel * x = ShiftModel();
        for(int i=0; i< x->rowCount(); i++)
        {
            QString name = x->record(i).value(4).toString();
            qDebug()<<name;
            if(name == ui->ShiftEmployeeCombo->currentText())
               ui->ShiftView->showRow(i);
            else
                ui->ShiftView->hideRow(i);
        }

    }
}
void MainForm::on_ShiftProjectRadio_toggled(bool checked)
{
    if(checked){
        QSqlQueryModel * x = ShiftModel();
        for(int i=0; i< x->rowCount(); i++)
        {
            QString project = x->record(i).value(5).toString();
            qDebug()<<project;
            if(project == ui->ShiftProjectCombo->currentText())
               ui->ShiftView->showRow(i);
            else
                ui->ShiftView->hideRow(i);
        }

    }
}
void MainForm::on_ShiftItemRadio_toggled(bool checked)
{
    if(checked){
        QSqlQueryModel * x = ShiftModel();
        for(int i=0; i< x->rowCount(); i++)
        {
            QString item = x->record(i).value(6).toString();
            if(item == ui->ShiftItemCombo->currentText())
               ui->ShiftView->showRow(i);
            else
                ui->ShiftView->hideRow(i);
        }

    }
}

void MainForm::on_ShiftEmployeeCombo_currentTextChanged(const QString &arg1)
{
    if(ui->ShiftEmployeeRadio->isChecked()){
        QSqlQueryModel * x = ShiftModel();
        for(int i=0; i< x->rowCount(); i++)
        {
            QString name = x->record(i).value(4).toString();
            qDebug()<<name;
            if(name == ui->ShiftEmployeeCombo->currentText())
               ui->ShiftView->showRow(i);
            else
                ui->ShiftView->hideRow(i);
        }

    }
}
void MainForm::on_ShiftProjectCombo_currentTextChanged(const QString &arg1)
{
    if(ui->ShiftProjectRadio->isChecked()){
        QSqlQueryModel * x = ShiftModel();
        for(int i=0; i< x->rowCount(); i++)
        {
            QString project = x->record(i).value(5).toString();
            qDebug()<<project;
            if(project == ui->ShiftProjectCombo->currentText())
               ui->ShiftView->showRow(i);
            else
                ui->ShiftView->hideRow(i);
        }
    }
}
void MainForm::on_ShiftItemCombo_currentTextChanged(const QString &arg1)
{
    if(ui->ShiftItemRadio->isChecked()){
        QSqlQueryModel * x = ShiftModel();
        for(int i=0; i< x->rowCount(); i++)
        {
            QString item = x->record(i).value(6).toString();
            if(item == ui->ShiftItemCombo->currentText())
               ui->ShiftView->showRow(i);
            else
                ui->ShiftView->hideRow(i);
        }
    }
}














QSqlDatabase MainForm::getProjectDataBase() const
{
    return projectDataBase;
}
QSqlDatabase MainForm::getEmployeeDataBase() const
{
    return employeeDataBase;
}
QSqlDatabase MainForm::getData() const
{
    return data;
}

