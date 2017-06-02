#include "exportform.h"
#include "ui_exportform.h"
#include <QFileDialog>
#include "xlsxdocument.h"
#include "mainform.h"
ExportForm::ExportForm(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::ExportForm)
{
    ui->setupUi(this);
    ui->ExcelTableChange->addItem("Employees");
    ui->ExcelTableChange->addItem("Projects");
    ui->ExcelTableChange->addItem("Items");
    ui->ExcelTableChange->addItem("Project's Items");
    ui->ExcelTableChange->addItem("Shifts");
    ui->ExcelTableChange->setCurrentIndex(4);

    data = ((MainForm*)parentWidget())->getData();

    data.hostName();
}

ExportForm::~ExportForm()
{
    delete ui;
}

void ExportForm::on_ExcelLocationChange_clicked()
{
    QString filename = QFileDialog::getSaveFileName(this,"Export Location","/..","*.xlsx");
    ui->ExcelLocation->setText(filename);
}

void ExportForm::on_buttonBox_accepted()
{
    Location = ui->ExcelLocation->text();
    Table = ui->ExcelTableChange->currentText();
    emit excel();

    this->hide();

}
