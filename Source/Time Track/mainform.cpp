#include "mainform.h"
#include "ui_mainform.h"
#include <QFileDialog>
#include <QMessageBox>
MainForm::MainForm(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::MainForm)
{

    ui->setupUi(this);







    ConnectSetup();

    clockoutForm = new ClockoutForm(this);
    clockoutForm->hide();
    ui->mainStack->setCurrentIndex(0);
    loginForm = new LoginForm(this);
    loginForm->hide();
    loginInitialize();
    shifteditform = new ShiftEditForm(this);
    shifteditform->hide();

    establishConnections();


}

MainForm::~MainForm()
{
    delete ui;
}


/* These are the database connections that this database uses.
 * The first is called setup. It's purpose is to store the
 * location of data which is the database that can be placed
 * anywhere on your computer or server and holds the actual
 * information about employees and such
*/
void MainForm::ConnectSetup(){

    setup = QSqlDatabase::addDatabase("QSQLITE","setup");
    QString setupPath = "../SQLite/setup/setup.sqlite";
    setup.setDatabaseName(setupPath);
    setup.open();

    QSqlQuery * qry = new QSqlQuery(setup);

    qry->prepare("select path,id from databaselist");
    if(qry->exec())
    {
        while(qry->next())
        {
            serverPath = qry->value(0).toString();
            //qDebug()<<serverPath;
        }
    }
    if(validData(serverPath)&&fileExists(serverPath))
    {
        qry->clear();
        qry->prepare("update databaselist set path='"+serverPath+"' where id = '1'");
        qry->exec();
        ConnectServer();
    }




}
void MainForm::DisconnectSetup(){
    setup.close();
    setup.removeDatabase("setup");
}
void MainForm::ConnectServer()
{
    data= QSqlDatabase::addDatabase("QSQLITE","data");
    data.setDatabaseName(serverPath);
    data.open();

}
void MainForm::DisconnectServer(){

    QString connection;
    connection = data.connectionName();
    ui->EmployeeView->setModel(new QSqlQueryModel());
    ui->ProjectView->setModel(new QSqlQueryModel());
    ui->ProjectItemView->setModel(new QSqlQueryModel());
    ui->ItemView->setModel(new QSqlQueryModel());
    ui->ShiftView->setModel(new QSqlQueryModel());
    ui->ShiftEmployeeCombo->setModel(new QSqlQueryModel());
    ui->ShiftProjectCombo->setModel(new QSqlQueryModel());
    ui->ShiftItemCombo->setModel(new QSqlQueryModel());
    ui->ProjectItemCombo->setModel(new QSqlQueryModel());
    data = QSqlDatabase::database();
    data.removeDatabase(connection);
}

/* These classes deal with file connections.
 * 'CheckIfFileNameIsValid' checks checks if a filepath is
 * 'validData' and if it isnt 'getsCorrectFileName.'
 * 'fileexists' is used throughout to see if a file exists lol.
*/
void MainForm::checkIfFileNameIsValid(QString x){
    qDebug()<<"1";
    if(validData(x)&&fileExists(x))
    {
        QSqlQuery * qry = new QSqlQuery(setup);
        qry->prepare("update databaselist set path='"+x+"' where id = '1'");
        qry->exec();
        serverPath=x;
        ConnectServer();
        qDebug()<<data.isOpen();
    }
    else
    {
        x = getCorrectFileName();
        checkIfFileNameIsValid(serverPath);

    }
}
QString MainForm::getCorrectFileName(){
    QString filename = QFileDialog::getOpenFileName(this,tr("Please select a valid path.."),"../","All files(*.sqlite)");
    qDebug()<<filename;

    if(filename == "")
    {
        qDebug()<<"IM here dumbass";
        QApplication::quit();
    }
    else if(fileExists(filename)&&validData(filename))
        return filename;
    else
        return getCorrectFileName();


}
bool MainForm::validData(QString path){
    QStringList pieces = path.split("/");
    QString needed = pieces.value(pieces.length()-1);

    if(needed == "data.sqlite")
        return true;
    else
        return false;
}
bool MainForm::fileExists(QString path) {
    QFileInfo check_file(path);

    return check_file.exists() && check_file.isFile();
}

/* These classes connect the different forms through
 * signals and slots
*/
void MainForm::establishConnections(){
    QObject::connect(loginForm,SIGNAL(logged()),this,SLOT(enter()));
    QObject::connect(clockoutForm,SIGNAL(finished()),this,SLOT(reenter()));
    QObject::connect(shifteditform,SIGNAL(finished()),this,SLOT(refreshShiftTab()));

    QObject::connect(ui->ProjectView->model(),SIGNAL(dataChanged(QModelIndex,QModelIndex,QVector<int>)),this, SLOT(refreshProjectTab()));
    QObject::connect(ui->ItemView->model(),SIGNAL(dataChanged(QModelIndex,QModelIndex,QVector<int>)),this, SLOT(refreshItemTab()));
    QObject::connect(ui->EmployeeView->model(),SIGNAL(dataChanged(QModelIndex,QModelIndex,QVector<int>)),this, SLOT(refreshEmployeeTab()));


//    QObject::connect(ui->ProjectView->horizontalHeader(),SIGNAL(sectionPressed(int)),this,SLOT(refreshProjectTab()));
//    QObject::connect(ui->ItemView->horizontalHeader(),SIGNAL(sectionPressed(int)),this,SLOT(refreshItemTab()));
//    QObject::connect(ui->EmployeeView->horizontalHeader(),SIGNAL(sectionPressed(int)),this,SLOT(refreshEmployeeTab()));
}
void MainForm::enter(){
    showtheThings();
    mainInitialize();
}
void MainForm::reenter(){

    showtheThings();
    basicInitialize();
}

/* Initialization of the different pages of mainform*/
void MainForm::loginInitialize(){
    basicInitialize();
    hidetheThings();

    isConnected();


}
void MainForm::isConnected(){
    if(data.isOpen())
    {
        ui->basicPageConnect->hide();
        loginForm->reset();
        loginForm->show();
    }
    else
    {
        ui->basicPageConnect->show();
        loginForm->hide();
    }
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

/* Deal with the signals and slots of the mainForm that
 * change what menu you are at
*/
void MainForm::hidetheThings(){
    ui->basicPageAdvanced->hide();
    ui->basicPageClockIn->hide();
    ui->basicPageClockOut->hide();
    ui->mainFinish->hide();

}
void MainForm::showtheThings(){

    ui->basicPageAdvanced->show();
    ui->basicPageClockIn->show();
    ui->basicPageClockOut->show();
    ui->mainFinish->show();
}
void MainForm::on_HeaderTabs_currentChanged(int index)
{
    if(index ==0){
        refreshEmployeeTab();
    }
    else if(index ==1){
        refreshProjectItemCombo();
        refreshProjectTab();
    }
    else if(index ==2){
        refreshItemTab();
    }
    else if(index ==3){
        refreshShiftTab();
    }
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

    QString shiftid;
    qry1.prepare("select MAX(shiftid) As maxshiftid from shiftlist");
    if(qry1.exec()){
        while(qry1.next()){
            shiftid=qry1.value(0).toString();}}
    int id1 = shiftid.toInt();
    id1++;
    shiftid = QString::number(id1);


    // Inserting clockin time and shiftnumber into pin.
    qry4.prepare("insert into shiftlist (employeeid,employeename,timein,datein,shiftid) values('"+employeeid+"','"+employeename+"','"+timein+"','"+datein+"','"+shiftid+"')");
    if (qry4.exec())
    {
        // Setting active.
        qry2.prepare("update employeelist set active=1 where id = '"+id+"'");
        qry2.exec();
        qry3.prepare("update employeelist set shiftcount = '"+shiftid+"' where id = '"+id+"'");
        qry3.exec();
    }

    ui->basicPageClockIn->hide();
    ui->basicPageClockOut->show();


}
void MainForm::on_basicPageClockOut_clicked()
{

    clockoutForm = new ClockoutForm(this);
    establishConnections();
    clockoutForm->ClockoutInitialize(id);
}
void MainForm::on_basicPageConnect_clicked()
{
    QString filename = QFileDialog::getOpenFileName(this,tr("Open File"),"../","All files(*.sqlite)");
    DisconnectServer();

    checkIfFileNameIsValid(filename);

    loginInitialize();
}
void MainForm::on_basicPageAdvanced_clicked()
{
    advInitialize();
    EmployeeTab();
    ShiftTab();
    ProjectTab();
    ItemTab();
    DatabaseTab();
    ui->MainTabs->setCurrentIndex(0);
    ui->HeaderTabs->setCurrentIndex(0);
}
void MainForm::on_mainFinish_clicked()
{

    loginInitialize();
}

/* Formatting of qdatetimes in order to only have times
 * that are in quarters
*/
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

/* Initialization of Database section of 'sections'
 * and the signal and slot for resetting the data-
 * base connection.
*/
void MainForm::DatabaseTab(){
    ui->DataBaseLabel->setText(serverPath);
}
void MainForm::on_DataBaseConnect_clicked()
{
    QString filename = QFileDialog::getOpenFileName(this,tr("Open File"),"../","All files(*.sqlite)");
    DisconnectServer();
    checkIfFileNameIsValid(filename);
    on_basicPageAdvanced_clicked();
}
void MainForm::on_DataBaseDisconnect_clicked()
{
    QString x = "/";
    QSqlQuery * qry = new QSqlQuery(setup);
    qry->prepare("update databaselist set path='"+x+"' where id = '1'");
    qry->exec();
    serverPath=x;
    DisconnectServer();
    ConnectServer();
    on_basicPageAdvanced_clicked();
}
// Employee Section!

/* Initialization and refreshing of the 'employeetab' in
 * 'sections'  along with the model for 'employeeView'.
*/
void MainForm::EmployeeTab()
{
    ui->MainTabs->setCurrentIndex(0);

    QSqlQueryModel * x=EmployeeModel();
    ui->EmployeeView->setModel(x);
    establishConnections();
    //ui->EmployeeView->resizeColumnsToContents();
    ui->EmployeeView->hideRow(0);
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
    establishConnections();

    //ui->EmployeeView->resizeColumnsToContents();

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

    for(int i=1; i< x->rowCount(); i++)
    {
        ui->EmployeeView->showRow(i);
    }

    if(ui->CurrentRadio->isChecked())
        on_CurrentRadio_toggled(true);
    if(ui->PastRadio->isChecked())
        on_PastRadio_toggled(true);


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
/* Option menu 1 for EmployeeTab*/
void MainForm::on_EmployeeAdd_clicked()
{
    QSqlQuery * qry = new QSqlQuery(data);
    QSqlQueryModel * x = EmployeeModel();
    qry->prepare("insert into employeelist(name,pin,adminstatus,shiftcount,active,current)  values('~','"+QString::number(generateRandom())+"','~','1','0','1')");
    qry->exec();
    refreshEmployeeTab();
    refreshShiftEmployee();
    ui->MainTabs->setCurrentIndex(0);
}
int MainForm::generateRandom(){
    int x = rand()%9000+1000;
    QSqlQuery * qry = new QSqlQuery(data);
    qry->prepare("select pin from employeelist");
    if(qry->exec())
    {
        while(qry->next())
        {
            if(qry->value(0).toInt()==x)
                return generateRandom();
        }
    }
    return x;
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
    refreshShiftEmployee();
    ui->MainTabs->setCurrentIndex(0);

}
/* Option menu 2 for EmployeeTab*/
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
/* Option menu 3 for EmployeeTab*/
void MainForm::on_AllRadio_toggled(bool checked)
{
    if(checked)
    {
        QSqlQueryModel * x = EmployeeModel();
        for(int i=1; i< x->rowCount(); i++)
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
        for(int i=1; i< x->rowCount(); i++)
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
        for(int i=1; i< x->rowCount(); i++)
        {
            int current = x->record(i).value(6).toInt();
            if(current == 1)
               ui->EmployeeView->hideRow(i);
            else
                ui->EmployeeView->showRow(i);
        }
    }
}

// Project Section!

/* Initialization and refreshing of the projecttab in
 * 'sections' along wiht the themodel. This section is
 * particular in the way it has two tables. That is the
 * for the three models for the 2nd table. 'ProjectItemModelFirst'
 * is for just after initialization the the others are for
 * general use after that special case.
*/
void MainForm::ProjectTab(){
    QSqlQueryModel * x=ProjectModel();
    ui->ProjectView->setModel(x);
    establishConnections();
    QSqlQueryModel * y = ProjectItemModelFirst();
    ui->ProjectItemView->setModel(y);
    //ui->ProjectView->resizeColumnsToContents();
    //ui->ProjectView->setSortingEnabled(true);
    ui->ProjectView->hideRow(0);
    ui->ProjectView->hideColumn(1);
    ui->ProjectView->hideColumn(2);
    ui->ProjectName->setChecked(true);
    ui->ProjectAllRadio->setChecked(true);
    ui->ProjectDate->setChecked(true);


    ui->ProjectItemName->setChecked(true);
    ui->ProjectItemView->hideColumn(1);
    refreshProjectItemCombo();


}
void MainForm::refreshProjectItemCombo(){
    QSqlQueryModel * a = new QSqlQueryModel();
    QSqlQuery * A = new QSqlQuery(data);
    A->prepare("Select name from itemlist where id>0");
    A->exec();
    a->setQuery(*A);
    ui->ProjectItemCombo->setModel(a);
}
void MainForm::refreshProjectItemComboSpecific(){

    QSqlQueryModel * a = new QSqlQueryModel();
    QSqlQuery * A = new QSqlQuery(data);
    A->prepare("Select name from itemlist where id>0");
    A->exec();
    a->setQuery(*A);
    ui->ProjectItemCombo->setModel(a);


}
void MainForm::on_ProjectView_clicked(const QModelIndex &index)
{

    QSqlQueryModel * x = ProjectItemModel();
    ui->ProjectItemView->setModel(x);

    refreshProjectItemComboSpecific();


}
void MainForm::refreshProjectTab(){
    ui->MainTabs->setCurrentIndex(1);

    QSqlQueryModel * x=ProjectModel();
    ui->ProjectView->setModel(x);
    establishConnections();
    QSqlQueryModel * y = ProjectItemModelFirst();
    ui->ProjectItemView->setModel(y);

//    for(int i=0; i< x->rowCount(); i++)
//    {

//        ui->ProjectView->showRow(i);
//        QString data = x->record(i).value(0).toString();
//        qDebug()<<data;
//        if(data=="All Projects")
//        {
//            qDebug()<<data;
//            ui->ProjectView->hideRow(i);
//        }
//    }

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
    if(ui->ProjectDate->isChecked())
        ui->ProjectView->showColumn(3);
    else
        ui->ProjectView->hideColumn(3);



    for(int i=1; i< x->rowCount(); i++)
    {
        ui->ProjectView->showRow(i);
    }

    if(ui->ProjectCurrentRadio->isChecked())
        on_ProjectCurrentRadio_toggled(true);
    if(ui->ProjectPastRadio->isChecked())
        on_ProjectPastRadio_toggled(true);

}
void MainForm::refreshProjectItemTab(){
    ui->MainTabs->setCurrentIndex(1);

    QSqlQueryModel * x = ProjectItemModelRefresh();
    ui->ProjectItemView->setModel(x);

   // ui->ProjectItemView->resizeColumnsToContents();

    if(ui->ProjectItemName->isChecked())
        ui->ProjectItemView->showColumn(0);
    else
        ui->ProjectItemView->hideColumn(0);

    if(ui->ProjectItemId->isChecked())
        ui->ProjectItemView->showColumn(1);
    else
        ui->ProjectItemView->hideColumn(1);
  //  ui->ProjectItemView->resizeColumnsToContents();
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
QSqlQueryModel * MainForm::ProjectItemModelFirst(){
    QSqlTableModel * model = new QSqlTableModel(0,data);
    QSqlQueryModel * x = ProjectModel();
    int idInt= x->record(1).value(1).toInt();
    QString id = QString::number(idInt);

    model->setTable("Project"+id);

    model->setEditStrategy(QSqlTableModel::OnFieldChange);
    model->select();
    model->setHeaderData(0,Qt::Horizontal,tr("Name"));
    model->setHeaderData(1,Qt::Horizontal,tr("Id"));

    return model;
}
QSqlQueryModel * MainForm::ProjectItemModel(){
    QSqlTableModel * model = new QSqlTableModel(0,data);
    QSqlQueryModel * x = ProjectModel();



    QModelIndexList  list =  ui->ProjectView->selectionModel()->selection().indexes();

    QModelIndex index = list.at(0);
    int idInt = x->record(index.row()).value(1).toInt();

    QString id = QString::number(idInt);

    model->setTable("Project"+id);

    model->setEditStrategy(QSqlTableModel::OnFieldChange);
    model->select();
    model->setHeaderData(0,Qt::Horizontal,tr("Name"));
    model->setHeaderData(1,Qt::Horizontal,tr("Id"));
    
    return model;
}
QSqlQueryModel * MainForm::ProjectItemModelRefresh(){
    QSqlTableModel * model = (QSqlTableModel*)ui->ProjectItemView->model();
    model->select();
    return model;
}
/* Option menu 1 for ProjectTab*/
void MainForm::on_ProjectAdd_clicked()
{
    QSqlQuery * qry = new QSqlQuery(data);

    QSqlQueryModel * x = ProjectModel();


    qry->prepare("insert into projectlist(name,current,date)  values('~','1','1/1/"+QString::number(QDate::currentDate().year())+"')");
    qry->exec();
    qry->clear();

    int idInt = x->record(x->rowCount()-1).value(1).toInt();
    idInt++;
    QString id = "Project"+QString::number(idInt);
    qry->prepare("CREATE TABLE '"+id+"'"
               "(name VARCHAR,id integer)");
    qry->exec();
    refreshProjectTab();
    refreshShiftProject();
    ui->MainTabs->setCurrentIndex(1);

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



        QString id = "Project"+QString::number(idInt);

        qry->clear();
        qry->prepare("DROP TABLE '"+id+"'");
        qry->exec();
        qry->clear();
        qry->prepare("DELETE from projectlist where id='"+QString::number(idInt)+"'");
        qry->exec();
    }
    refreshProjectTab();
    refreshShiftProject();
    ui->MainTabs->setCurrentIndex(1);
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
        //qDebug()<<id;
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
/* Option menu 2 for ProjectTab*/
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
void MainForm::on_ProjectDate_clicked()
{
    refreshProjectTab();
}
/* Option menu 3 for ProjectTab*/
void MainForm::on_ProjectAllRadio_toggled(bool checked)
{
    if(checked){
        QSqlQueryModel * x = ProjectModel();
        for(int i=1; i< x->rowCount(); i++)
        {
            ui->ProjectView->showRow(i);
        }
    }
}
void MainForm::on_ProjectCurrentRadio_toggled(bool checked)
{
    if(checked){
        QSqlQueryModel * x = ProjectModel();
        for(int i=1; i< x->rowCount(); i++)
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
        for(int i=1; i< x->rowCount(); i++)
        {
            int current = x->record(i).value(2).toInt();
            if(current == 1)
               ui->ProjectView->hideRow(i);
            else
                ui->ProjectView->showRow(i);
        }
    }
}
/* Option menu 4 for ProjectTab*/
void MainForm::on_ProjectItemName_clicked()
{
    refreshProjectItemTab();
}
void MainForm::on_ProjectItemId_clicked()
{
    refreshProjectItemTab();
}
/* Option menu 5 for ProjectTab*/
void MainForm::on_ProjectItemAdd_clicked()
{
    QString itemName = ui->ProjectItemCombo->currentText();
    QSqlQuery * qry = new QSqlQuery(data);
    qry->prepare("select id from itemlist where name='"+itemName+"'");
    QString itemId;
    if(qry->exec()){
        while(qry->next())
            itemId = qry->value(0).toString();
    }



    qry->clear();
    
    QSqlTableModel * model = (QSqlTableModel*)ui->ProjectItemView->model();
    QString table = model->tableName();
    qry->prepare("insert into'"+table+"'(name,id) values('"+itemName+"','"+itemId+"')");
    qry->exec();

    model->select();
    ui->ProjectItemView->setModel(model);

            
}
void MainForm::on_ProjectItemRemove_clicked()
{
    QSqlQuery * qry = new QSqlQuery(data);
    QModelIndexList list = ui->ProjectItemView->selectionModel()->selection().indexes();

    QSqlTableModel * tablemodel = (QSqlTableModel*)ui->ProjectItemView->model();
    QString table = tablemodel->tableName();
    for(int i=0; i< list.count(); i++)
    {
        QModelIndex index =list.at(i);
        QString id = tablemodel->record(index.row()).value(1).toString();

        qry->clear();
        qry->prepare("DELETE from '"+table+"' where id='"+id+"'");
        qry->exec();
    }
    tablemodel->select();
    ui->ProjectItemView->setModel(tablemodel);




}

// Item Section!

/* Initialization,model,and refreshing for the
 * 'itemtab' in 'sections'
 */
void MainForm::ItemTab(){
    QSqlQueryModel * x=ItemModel();
    ui->ItemView->setModel(x);
    establishConnections();
    ui->ItemView->hideRow(0);
    ui->ItemView->hideColumn(1);
   // ui->ItemView->resizeColumnsToContents();
    ui->ItemName->setChecked(true);
    ui->ItemId->setChecked(false);
    ui->ItemCategory->setChecked(true);
    ui->ItemSub->setChecked(true);
    ui->ItemDimension->setChecked(true);
}
QSqlQueryModel * MainForm::ItemModel(){
    QSqlTableModel * model = new QSqlTableModel(0,data);
    model->setTable("itemlist");
    model->setEditStrategy(QSqlTableModel::OnFieldChange);
    model->select();
    model->setHeaderData(0,Qt::Horizontal,tr("Name"));
    model->setHeaderData(1,Qt::Horizontal,tr("Id"));
    model->setHeaderData(2,Qt::Horizontal,tr("Category"));
    model->setHeaderData(3,Qt::Horizontal,tr("Sub-Catergory"));
    model->setHeaderData(4,Qt::Horizontal,tr("Dimension"));

    return model;

}
void MainForm::refreshItemTab(){
    ui->MainTabs->setCurrentIndex(2);

    QSqlQueryModel * x=ItemModel();
    ui->ItemView->setModel(x);
    establishConnections();

   // ui->ItemView->resizeColumnsToContents();

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
/* Option menu 1 for ItemTab*/
void MainForm::on_ItemAdd_clicked()
{
    QSqlQuery * qry = new QSqlQuery(data);
    QSqlQueryModel * x = ItemModel();
    qry->prepare("insert into itemlist(name,category,subcategory,dimension)  values('~','~','~','~')");
    qry->exec();
    refreshItemTab();
    refreshProjectItemCombo();
    refreshShiftItem();
    ui->MainTabs->setCurrentIndex(2);
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
    refreshProjectItemCombo();
    refreshShiftItem();
    ui->MainTabs->setCurrentIndex(2);
}
/* Option menu 2 for ItemTab*/
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

// Shift Section!

/* Initialization,three combobox refreshers,model,
 * and main refresher for the 'shiftTab' within 'sections'
*/
void MainForm::ShiftTab(){
    ui->ShiftDate1->setDate(QDate(QDate::currentDate().year(),1,1));
    ui->ShiftDate2->setDate(QDate::currentDate());
    refreshShiftEmployee();
    refreshShiftProject();
    refreshShiftItem();
    QSqlQueryModel * x=ShiftModel();

    ui->ShiftView->setModel(x);


    ui->ShiftView->hideColumn(0);
    ui->ShiftView->hideColumn(1);
    ui->ShiftView->hideColumn(2);
    ui->ShiftView->hideColumn(3);
    ui->ShiftView->hideColumn(13);

    refreshShiftTab();
}
void MainForm::refreshShiftEmployee(){
    QSqlQueryModel * a = new QSqlQueryModel();
    QSqlQuery * A = new QSqlQuery(data);
    A->prepare("Select name from employeelist");
    A->exec();
    a->setQuery(*A);
    ui->ShiftEmployeeCombo->setModel(a);

}
void MainForm::refreshShiftProject(){
    QSqlQueryModel * b = new QSqlQueryModel();
    QSqlQuery * B = new QSqlQuery(data);
    B->prepare("Select name from projectlist");
    B->exec();
    b->setQuery(*B);
    ui->ShiftProjectCombo->setModel(b);
}
void MainForm::refreshShiftItem(){
    QSqlQueryModel * c = new QSqlQueryModel();
    QSqlQuery * C = new QSqlQuery(data);
    C->prepare("Select name from itemlist");
    C->exec();
    c->setQuery(*C);
    ui->ShiftItemCombo->setModel(c);
}
QSqlQueryModel * MainForm::ShiftModel(){

    QSqlTableModel * model = new QSqlTableModel(0,data);

    model->setTable("shiftlist");
    model->setEditStrategy(QSqlTableModel::OnFieldChange);
    model->select();
    model->setHeaderData(0,Qt::Horizontal,tr("Id"));
    model->setHeaderData(1,Qt::Horizontal,tr("Employee Id"));
    model->setHeaderData(2,Qt::Horizontal,tr("Project Id"));
    model->setHeaderData(3,Qt::Horizontal,tr("Item Id"));
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
    QSqlQueryModel * x = ShiftModel();
    for(int i=0; i< x->rowCount(); i++)
    {

        ui->ShiftView->showRow(i);

    }
    if(ui->ShiftEmployeeCombo->currentText()!="All Employees")
    {
        for(int i=0; i< x->rowCount(); i++)
        {
            QString data = x->record(i).value(4).toString();
            if(data != ui->ShiftEmployeeCombo->currentText()){

               ui->ShiftView->hideRow(i);

            }
        }
    }
    if(ui->ShiftProjectCombo->currentText()!="All Projects")
    {
        for(int i=0; i< x->rowCount(); i++)
        {
            QString data = x->record(i).value(5).toString();
            if(data != ui->ShiftProjectCombo->currentText()){
                ui->ShiftView->hideRow(i);

            }

        }
    }
    if(ui->ShiftItemCombo->currentText()!="All Items")
    {
        for(int i=0; i< x->rowCount(); i++)
        {
            QString data = x->record(i).value(6).toString();
            if(data != ui->ShiftItemCombo->currentText())
            {
                ui->ShiftView->hideRow(i);

            }
        }
    }
    for(int i=0; i< x->rowCount(); i++)
    {
        QString a = x->record(i).value(9).toString();
        QDate in= QDate(a.split("-")[0].toInt(),a.split("-")[1].toInt(),a.split("-")[2].toInt());
        //qDebug()<<ui->ShiftDate1->date()<<ui->ShiftDate2->date();

        if(in<ui->ShiftDate1->date())
        {
            ui->ShiftView->hideRow(i);
        }
        if(in>ui->ShiftDate2->date())
        {
            ui->ShiftView->hideRow(i);
        }
    }


    int ihours = 0;
    int iminutes = 0;
    for(int i=0; i< x->rowCount(); i++)
    {
        QString a = x->record(i).value(12).toString();

        if(!ui->ShiftView->isRowHidden(i)&&x->record(i).value(12).toString()!="")
        {
            QString hours = a.split(":")[0];
            QString minutes = a.split(":")[1];
            ihours += hours.toInt();
            iminutes += minutes.toInt();
        }

    }
    ihours+= iminutes/60;
    iminutes = iminutes%60;

    QString hours = QString::number(ihours);
    QString minutes = QString::number(iminutes);
    if (minutes == "0")
        minutes ="00";

    ui->ShiftTotalTime->setText(hours+":"+minutes);
    ui->ShiftView->setModel(x);

}
/* Option menu 1 for shiftTab*/
void MainForm::on_ShiftDate1_dateChanged(const QDate &date)
{
    refreshShiftTab();
}
void MainForm::on_ShiftDate2_dateChanged(const QDate &date)
{
    refreshShiftTab();
}
/* Option menu 2 for shiftTab*/
void MainForm::on_ShiftEmployeeCombo_currentTextChanged(const QString &arg1)
{
    refreshShiftTab();
}
void MainForm::on_ShiftProjectCombo_currentTextChanged(const QString &arg1)
{
    refreshShiftTab();
}
void MainForm::on_ShiftItemCombo_currentTextChanged(const QString &arg1)
{
    refreshShiftTab();
}
/* Option menu 3 for shiftTab*/
void MainForm::on_ShiftAdd_clicked()
{
    shifteditform = new ShiftEditForm(this);
    establishConnections();
    shifteditform->AddShift();
    refreshShiftTab();
}
void MainForm::on_ShiftEdit_clicked()
{
    shifteditform = new ShiftEditForm(this);
    establishConnections();
    QModelIndexList list = ui->ShiftView->selectionModel()->selection().indexes();

    if(list!= *(new QModelIndexList()))
    {

        QModelIndex index =list.at(0);
        QSqlQueryModel * x = ShiftModel();


        if(x->record(index.row()).value(2).toString()=="")
        {
            int idInt = x->record(index.row()).value(0).toInt();
            QString id = QString::number(idInt);
            idInt = x->record(index.row()).value(13).toInt();
            QString shiftid = QString::number(idInt);
            shifteditform->EditWorkingShift(shiftid,id);
        }
        else{
            int idInt = x->record(index.row()).value(13).toInt();
            QString id = QString::number(idInt);
            shifteditform->EditFinishedShift(id);
        }

        refreshShiftTab();
    }
}
void MainForm::on_ShiftDelete_clicked()
{
    QSqlQuery * qry = new QSqlQuery(data);
    QModelIndexList list = ui->ShiftView->selectionModel()->selection().indexes();
    QSqlQueryModel * x = ShiftModel();

    for(int i=0; i< list.count(); i++)
    {
        QModelIndex index =list.at(i);
        int idInt = x->record(index.row()).value(13).toInt();
        QString id = QString::number(idInt);


        qry->clear();
        qry->prepare("DELETE from shiftlist where shiftid='"+id+"'");
        qry->exec();

        if(x->record(index.row()).value(2).toString()=="")
        {
            qry->clear();
            qry->prepare("update employeelist set active='0' where name='"+x->record(index.row()).value(4).toString()+"'");
            qry->exec();
        }

    }
    refreshShiftTab();
}

//Settings Sections!

/* Quickly made this section so that I could maximize
 * and fullscreen the program easily plan on making
 * this cleaner later.*/
void MainForm::on_SettingsMaximized_clicked()
{
    this->showMaximized();
}
void MainForm::on_SettngsFullScreen_clicked()
{
    this->showFullScreen();
}

/* This is the method used for sending the data
 * database to sub-form.
 */
QSqlDatabase MainForm::getData() const
{
    return data;
}







