/********************************************************************************
** Form generated from reading UI file 'exportform.ui'
**
** Created by: Qt User Interface Compiler version 5.11.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_EXPORTFORM_H
#define UI_EXPORTFORM_H

#include <QtCore/QVariant>
#include <QtWidgets/QApplication>
#include <QtWidgets/QComboBox>
#include <QtWidgets/QDateEdit>
#include <QtWidgets/QDialog>
#include <QtWidgets/QDialogButtonBox>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_ExportForm
{
public:
    QGridLayout *gridLayout;
    QDialogButtonBox *buttonBox;
    QWidget *ExcelWidget;
    QGridLayout *gridLayout_2;
    QHBoxLayout *horizontalLayout;
    QLabel *label_4;
    QDateEdit *To;
    QLabel *label_3;
    QDateEdit *From;
    QLineEdit *ExcelLocation;
    QPushButton *ExcelLocationChange;
    QLabel *label;
    QLabel *label_2;
    QComboBox *ExcelTableChange;
    QComboBox *ExcelTableName;
    QLabel *label_5;

    void setupUi(QDialog *ExportForm)
    {
        if (ExportForm->objectName().isEmpty())
            ExportForm->setObjectName(QStringLiteral("ExportForm"));
        ExportForm->resize(525, 165);
        ExportForm->setStyleSheet(QLatin1String("QWidget#MainForm{\n"
"\n"
"background-color:#E5EAE7;\n"
"}\n"
"\n"
"*{\n"
"font-family:\"Calibri\";\n"
"font-size: 14px;\n"
"\n"
"}\n"
"\n"
"\n"
"QTabWidget{\n"
"margin:0px;\n"
"padding:0px;\n"
"border:none;\n"
"\n"
"background-color:#F1F4F5;\n"
"\n"
"}\n"
"\n"
"\n"
"QTabBar{\n"
"background-color:#F1F4F5;\n"
"border:none;\n"
"padding:10px;\n"
"}\n"
"QTabBar::tab:selected,QTabBar::tab:hover{\n"
"\n"
"color:#444946;\n"
"}\n"
"QTabBar::tab{\n"
"background-color:#E5EAE7;\n"
"\n"
"color:black;\n"
"}\n"
"QTabBar::tab:hover{\n"
"background-color:#f3f0f2;\n"
"\n"
"}\n"
"QTabBar::tab:selected{\n"
"background-color:#fcfbfb;\n"
"}\n"
"\n"
"\n"
"\n"
"\n"
"\n"
"QStackedWidget{\n"
"margin:0px;\n"
"padding:0px;\n"
"}\n"
"\n"
"\n"
"QWidget{\n"
"margin:0px;\n"
"padding:0px;\n"
"}\n"
"\n"
"\n"
"\n"
"QPushButton{\n"
"padding:3px;\n"
"border:none;\n"
"background-color:#F1F4F5;\n"
"}\n"
"QPushButton:hover,QPushButton:hover{\n"
"background-color:#E4E9EB;\n"
"}\n"
"\n"
"QPushButton#basicPageConnect:hover{\n"
"border-radius:15px;\n"
""
                        "\n"
"}\n"
"\n"
"QDateTimeEdit{\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"}\n"
"QDateEditTime:hover{\n"
"border:none;\n"
"background-color:#D1D1D1;\n"
"}\n"
"QDateEditTime::drop-down{\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"QComboBox{\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"}\n"
"QComboBox:hover {\n"
"background-color:#D1D1D1;\n"
"}\n"
"\n"
"QComboBox:drop-down{\n"
"border:none;\n"
"}\n"
"QLineEdit,QTimeEdit,QDateEdit,QSpinBox,QDateTimeEdit{ \n"
"background-color:#FFFFFF;\n"
" border: 0px solid #D1D1D1;	\n"
"\n"
"}\n"
"QLineEdit:hover,QTimeEdit:hover,QDateEdit:hover,QSpinBox:hover,QDateTimeEdit:hover{ \n"
"background-color:#FFFFFF;\n"
" border: 1px solid #D1D1D1;	\n"
"}\n"
"\n"
"QRadioButton{\n"
"padding:0px;\n"
"margin:0px;\n"
"\n"
"}\n"
"\n"
"QDateEdit{\n"
"border:none;\n"
"background-color:#F1F4F5;\n"
"}\n"
"QDateEdit:hover{\n"
"background-color:#E4E9EB;\n"
"}\n"
"QDateEdit:drop-down{\n"
"border:none;\n"
"}\n"
"QGroupBox {\n"
"    border: 0px solid gray;\n"
"	\n"
"    margin-top: 0.5em;\n"
""
                        "	margin-right:0px;\n"
"	margin-left:0px;\n"
"}\n"
"QGroupBox::title {\n"
"    subcontrol-origin: margin;\n"
"    left: 10px;\n"
"    padding: 0 3px 0 3px;\n"
"}\n"
"\n"
"QCheckBox::indicator,QRadioButton::indicator{\n"
"border:none;\n"
"background-color:#F1F4F5;\n"
"\n"
"}\n"
"\n"
"QCheckBox::indicator:checked,QRadioButton::indicator:checked{\n"
"border:none;\n"
"background-color:#8DAA91;\n"
"\n"
"}\n"
"\n"
""));
        gridLayout = new QGridLayout(ExportForm);
        gridLayout->setObjectName(QStringLiteral("gridLayout"));
        buttonBox = new QDialogButtonBox(ExportForm);
        buttonBox->setObjectName(QStringLiteral("buttonBox"));
        buttonBox->setOrientation(Qt::Horizontal);
        buttonBox->setStandardButtons(QDialogButtonBox::Cancel|QDialogButtonBox::Ok);

        gridLayout->addWidget(buttonBox, 1, 0, 1, 1);

        ExcelWidget = new QWidget(ExportForm);
        ExcelWidget->setObjectName(QStringLiteral("ExcelWidget"));
        gridLayout_2 = new QGridLayout(ExcelWidget);
        gridLayout_2->setObjectName(QStringLiteral("gridLayout_2"));
        horizontalLayout = new QHBoxLayout();
        horizontalLayout->setObjectName(QStringLiteral("horizontalLayout"));
        label_4 = new QLabel(ExcelWidget);
        label_4->setObjectName(QStringLiteral("label_4"));

        horizontalLayout->addWidget(label_4);

        To = new QDateEdit(ExcelWidget);
        To->setObjectName(QStringLiteral("To"));
        To->setCalendarPopup(true);

        horizontalLayout->addWidget(To);

        label_3 = new QLabel(ExcelWidget);
        label_3->setObjectName(QStringLiteral("label_3"));

        horizontalLayout->addWidget(label_3);

        From = new QDateEdit(ExcelWidget);
        From->setObjectName(QStringLiteral("From"));
        From->setCalendarPopup(true);

        horizontalLayout->addWidget(From);


        gridLayout_2->addLayout(horizontalLayout, 1, 0, 1, 2);

        ExcelLocation = new QLineEdit(ExcelWidget);
        ExcelLocation->setObjectName(QStringLiteral("ExcelLocation"));

        gridLayout_2->addWidget(ExcelLocation, 0, 1, 1, 1);

        ExcelLocationChange = new QPushButton(ExcelWidget);
        ExcelLocationChange->setObjectName(QStringLiteral("ExcelLocationChange"));

        gridLayout_2->addWidget(ExcelLocationChange, 0, 2, 1, 1);

        label = new QLabel(ExcelWidget);
        label->setObjectName(QStringLiteral("label"));

        gridLayout_2->addWidget(label, 0, 0, 1, 1);

        label_2 = new QLabel(ExcelWidget);
        label_2->setObjectName(QStringLiteral("label_2"));

        gridLayout_2->addWidget(label_2, 2, 0, 1, 1);

        ExcelTableChange = new QComboBox(ExcelWidget);
        ExcelTableChange->setObjectName(QStringLiteral("ExcelTableChange"));

        gridLayout_2->addWidget(ExcelTableChange, 2, 1, 1, 1);

        ExcelTableName = new QComboBox(ExcelWidget);
        ExcelTableName->setObjectName(QStringLiteral("ExcelTableName"));
        ExcelTableName->setEditable(true);

        gridLayout_2->addWidget(ExcelTableName, 3, 1, 1, 1);

        label_5 = new QLabel(ExcelWidget);
        label_5->setObjectName(QStringLiteral("label_5"));

        gridLayout_2->addWidget(label_5, 3, 0, 1, 1);


        gridLayout->addWidget(ExcelWidget, 0, 0, 1, 1);


        retranslateUi(ExportForm);
        QObject::connect(buttonBox, SIGNAL(accepted()), ExportForm, SLOT(accept()));
        QObject::connect(buttonBox, SIGNAL(rejected()), ExportForm, SLOT(reject()));

        QMetaObject::connectSlotsByName(ExportForm);
    } // setupUi

    void retranslateUi(QDialog *ExportForm)
    {
        ExportForm->setWindowTitle(QApplication::translate("ExportForm", "Dialog", nullptr));
        label_4->setText(QApplication::translate("ExportForm", "To:", nullptr));
        label_3->setText(QApplication::translate("ExportForm", "From:", nullptr));
        ExcelLocationChange->setText(QApplication::translate("ExportForm", "+", nullptr));
        label->setText(QApplication::translate("ExportForm", "File Location:", nullptr));
        label_2->setText(QApplication::translate("ExportForm", "Table to Export:", nullptr));
        label_5->setText(QApplication::translate("ExportForm", "Employee:", nullptr));
    } // retranslateUi

};

namespace Ui {
    class ExportForm: public Ui_ExportForm {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_EXPORTFORM_H
